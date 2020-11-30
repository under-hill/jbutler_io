# CyberGames 2020

## Overview
- [CyberGames 2020](https://ctftime.org/event/1106) was a public jeopardy-style CTF run by [MetaCTF](https://metactf.com) for 24 hours across Oct 24-25 2020.  
- [My team](https://ctftime.org/team/15999) scored 6th overall and 3rd  in the non-student tier. I was impressed by MetaCTF's quantity and quality of questions.  
- Below are some of the challenges I solved, of varying difficulty (mostly web).

## High Security Fan Page
The easiest web problem begins with a description about a fan page for Katy Perry  

<img src="./images/CyberGames2020/HSFP_Overview.jpg" alt="High Security Fan Page Description" width="800" style="vertical-align:middle;margin:0px 50px"/><br>
\
First we go to the provided link, and are presented with a minimal login screen.  

<img src="./images/CyberGames2020/HSFP_Logon.jpg" alt="High Security Fan Page Logon Page" width="800" style="vertical-align:middle;margin:0px 50px"/><br>
\
Next, before looking for sub-directories or trying the login form, let's take a look at everything that is pulled from the server to display this page. To do this we can just pull up Developer Tools (I'm using Firefox).

Here we get an easy win - the username and password have been hardcoded in an included js file.

<img src="./images/CyberGames2020/HSFP_Debugger.jpg" alt="High Security Fan Page Logon Page" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

## Barry's Web Application
Next up, we have Barry's Web Application. We read the description and head to the link to check out Barry's app.

<img src="./images/CyberGames2020/BWA_Overview.jpg" alt="Barry's Web Application Overview" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Barry's home page:

<img src="./images/CyberGames2020/BWA_HomePage.jpg" alt="Barry's Web Application Home Page" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

One of the first things we notice is the juicy URL path that the web server is serving the files from. What happens if we try /dev?

<img src="./images/CyberGames2020/BWA_DirListing.jpg" alt="Barry's Web Application Directory Listing" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

This looks like a case where the web server root was placed too deep in the file system, and is serving more than just the intended web app files. Directory listing is also enabled, which makes our job easier - but even if directory listing was disabled this would still be an issue because we could run wordlists against /dev.

Boom, we find the flag inside the docs folder.

<img src="./images/CyberGames2020/BWA_Flag.jpg" alt="Barry's Web Application Flag" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

## Everyone Loves a Good Cookie

The third web problem, "Everyone Loves a Good Cookie", opens up with a description of cookies and points us to a web app that presumably has some misconfigured cookie management.

<img src="./images/CyberGames2020/ELGC_Overview.jpg" alt="Everyone Loves a Good Cookie Overview" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

The cookie dashboard:

<img src="./images/CyberGames2020/ELGC_Home.jpg" alt="Everyone Loves a Good Cookie Home Page" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

When I'm dealing with cookies I prefer to use Burp Suite, because the Repeater tab makes it effortless to edit and re-send raw http requests. Let's try a random value in this web form and catch the request in Burp to see if the server is setting any cookies in the response headers.

<img src="./images/CyberGames2020/ELGC_Burp.jpg" alt="Everyone Loves a Good Cookie Burp" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Here we see an authentication cookie ("cm-authenticated") being set with a value of 0. It looks like the idea here is that the back-end will only respond with setting the auth cookie to 1 if the secret code was submitted. But we can just manually set it to 1, and send a GET request to the same endpoint as if we had previously submitted a valid code.

<img src="./images/CyberGames2020/ELGC_Flag.jpg" alt="Everyone Loves a Good Cookie Flag" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

And boom, we have the flag. In this case the challenge was easy enough that Burp was a bit overkill. We could also have solved this very easily, by just opening up dev tools after we tried a random code and seeing the cookie that was set. Then we change the cookie value to 1 and refresh the page.

Seeing the cookie in dev tools:

<img src="./images/CyberGames2020/ELGC_DevTools.jpg" alt="Everyone Loves a Good Cookie DevTools" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Editing value to 1 and refreshing page:

<img src="./images/CyberGames2020/ELGC_Alternate.jpg" alt="Everyone Loves a Good Cookie Alternate" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

## [REDACTED]

Next up is a reverse engineering challenge that proved to be trivial... with the right toolkit.

<img src="./images/CyberGames2020/Redact_Overview.jpg" alt="[REDACTED] Overview" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

The challenge description tells us that we need to recover the redacted area of a PDF. PDF files can be quite complex and have lots of different things embedded in them. Trail of Bits has a nice discussion of forensics, PDF files, and binwalk [here](https://trailofbits.github.io/ctf/forensics/).

Here's the original PDF:

<img src="./images/CyberGames2020/Redact_Original.jpg" alt="[REDACTED] Original" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

When we run binwalk to see what might be inside this PDF, we see a jpg at offset 782. We can extract the jpg with dd by specifying the input file, output file (to be extracted), the offset, and the block size. Finally we install imagemagick so we can look cool by displaying the jpg from terminal, and boom we get the flag.

<img src="./images/CyberGames2020/Redact_Flag.jpg" alt="[REDACTED] Flag" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

In full disclosure, when I was prepping for this CTF I looked for writeups from other CTFs run by MetaCTF to get a feel for the types of problems they like to use. One of the few I came across was [this one](https://blog.welcomethrill.house/2019/01/bhis-ctfshmoocon-2019-feeling-blue.html) which uses the exact same approach to solve a similar style problem.

## Vulnerability Through Customizability

Now we start to hit more technically challenging problems. Vulnerability Through Customizability opens up by giving us all the source code for a running web app, and hints that the developers customized something in a dangerous way.

<img src="./images/CyberGames2020/VTC_Overview.jpg" alt="VTC Overview" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Here's the web app:

<img src="./images/CyberGames2020/VTC_Home.jpg" alt="VTC Home" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

And here's the source code we're given.

<img src="./images/CyberGames2020/VTC_SourceView.jpg" alt="VTC Source Code" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

There's a lot of code here (each folder is full), so I'd like to narrow down the search for the vulnerable customization. Fortunately, every problem in this CTF had a free hint that helped provide a bit more context / direction to the challenge without deducting points. This challenge's hint mentioned 'framework', so after some research I discovered that some theme plugins in wordpress are considered frameworks, and eventually honed in on twentytwenty, which was in wp-content/themes/twentytwenty. For future reference, a cleaner way to do this (as mentioned by [this writeup](https://www.uzpg.me/cyber-security/2020/10/26/writeups-for-metactf-2020#vulnerability-through-customizability) of the same challenge) is to do a fresh download of the specific wordpress version in our provided code base, and do a diff between the clean download and the CTF's provided codebase.

After digging through diff output against the twentytwenty I downloaded from GitHub, we see that index.php looks to have the custom code we're interested in.

<img src="./images/CyberGames2020/VTC_IndexDiff.jpg" alt="VTC Index.php Diff" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Here's a closer look at some of the culprit code.

<img src="./images/CyberGames2020/VTC_CustomQueryCode.jpg" alt="VTC Custom Query Code" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

I was distracted by the RPC (Remote Procedure Call) code in `if(!local)` for a while, but it turns out that local (the else block) is more interesting. What's happening here is that we can pull values from the `$_STATUS` array and display them to the client, provided the right conditions are met. For example, we can show the disk usage on the host machine by searching for "status local cc_sys_disk", because this will use the array key alias in line 100, and pull the value of this key from `$_STATUS`.

<img src="./images/CyberGames2020/VTC_cc-disk.jpg" alt="VTC cc_sys_disk" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

It looks like the developers' intent was to only use the three `cc_sys_` aliases in lines 99-101 to get live data on the host system's health.

But as you can see, the logic here doesn't prohibit other values in `$_STATUS` from being displayed. This snippet doesn't give full context, but suffice it to say that we control `$target` from the search query.

```PHP
// Local
echo '<div class="archive-subtitle section-inner thin max-percentage intro-text">Status for <i>CentiCorp Server</i></div>';
$lookup = $target;
foreach ($aliases as $key => $value) {
    if (in_array($target, $value)) {
        $lookup = $key;
    }
}
if (array_key_exists($lookup, $_STATUS)) {
    echo '<div class="archive-subtitle section-inner thin max-percentage intro-text">'.$lookup.': '.$_STATUS[$lookup].'</div>';
} else {
    echo '<div class="archive-subtitle section-inner thin max-percentage intro-text">System status variable not found.</div>';
}
```

To see if this is a case of information disclosure, let's do a code search for the `$_STATUS` array.

<img src="./images/CyberGames2020/VTC_status.jpg" alt="VTC $_STATUS" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Here we see that everything from `$_ENV` is converted to lowercase and copied into `$_STATUS` with a `cc_` prefix. If you aren't familiar with PHP, `$_ENV` is a global array that has all system environment variables copied into it when the program was launched.

This is looking good, since we could imagine the flag just being an environment variable on the host machine and we could just reflect it into the web page by searching for cc_flag. Unfortunately this doesn't work.

The next bit of insight we need is to think about what other code in this project might be using `$_ENV` to populate sensitive values.

One of the ways that you can pull from `$_ENV` without indexing directly into the array is with the `getenv()` function. If we do a code search for `getenv()` we see that the database configuration strings are coming from `$_ENV`.

<img src="./images/CyberGames2020/VTC_db-password.jpg" alt="VTC DB strings" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Bringing it all together, we can now get these sensitive values reflected in the web app by searching for `cc_<lowercase value>`

And the flag is in `DB_PASSWORD`:

<img src="./images/CyberGames2020/VTC_cc-flag.jpg" alt="VTC Flag" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

## I do it IN THE CLOUD

This was a fun and also convenient challenge for me because the web app ran on Azure Functions, which is a technology I'm familiar with from my day job. The problem description clues us in that there will be a relatively simple input vector, after which a rough knowledge of Azure Functions internals will take us to the flag.

<img src="./images/CyberGames2020/Cloud_Overview.jpg" alt="VTC Flag" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

First let's look at the web app to hunt for the 'fairly common web vulnerability'.

<img src="./images/CyberGames2020/Cloud_Home.jpg" alt="Cloud Home" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

After poking around the site for a bit and looking at the functionality of the raffle form, we see that the `/profile-picture` endpoint accepts a filename in the query string and returns the requested file. This is used to populate the little icon for each of the raffle participants.

<img src="./images/CyberGames2020/Cloud_NetworkTraffic.jpg" alt="Cloud Network traffic" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

To see if this endpoint is vulnerable to a [Local File Inclusion](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion)] bug, we can try different types of files and filepaths in the `img` parameter, or even run file wordlists against it if we have no expertise with the host's web app deployment system.

Fortunately, I'm familiar with Azure Functions so I know that `README.md` is the default readme file, and we also know that the Operating System is Windows because the server is returning `Microsoft-IIS/10.0` http response headers. It is helpful to know that the target OS is Windows because I would normally use forward slashes for directory traversal.

First we try `.\README.md`, then back up a directory and get payoff with `..\README.md`. All that this payload is doing is traversing the file path on the web server host machine up one directory, then returning the contents of the `README.md` file in that directory.

<img src="./images/CyberGames2020/Cloud_LFI.jpg" alt="Cloud LFI" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

The folder structure and contents we see from the readme give us lots of valuable info. Based off of the contents of the `CreateParticipant` folder we know that the app is written in C# Script (because of the .csx file extension), which has a default entry file of `run.csx`, and uses `function.json` for config info. Armed with this data, let's look at the `run.csx` and `function.json` for `GetFlag`.

Here's `GetFlag\run.csx`:

<img src="./images/CyberGames2020/Cloud_run-csx.jpg" alt="Cloud run.csx" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Here's `GetFlag\function.json`:

<img src="./images/CyberGames2020/Cloud_FlagRoute.jpg" alt="Cloud Flag Route" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Chaining it all together, we now know that the GetFlag function accepts HttpTriggers with a GET request to the `/flag` route, and that to be authorized we must have a `password` header with the value "incredibleflashlightdolphincrypticmosaic"... and boom: the flag!

<img src="./images/CyberGames2020/Cloud_Flag.jpg" alt="Cloud Flag" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

## When Sqlmaps Attack!

One of the final interesting challenges I solved is to recover the information disclosed from a SQLMap attack by looking at a network packet capture of all the traffic.

Here's the problem description:

<img src="./images/CyberGames2020/SqlMap_Overview.jpg" alt="SQLMap Overview" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

When we open the pcap in Wireshark we start to get a feel for what is going on. There is one source IP that is attacking one target IP, and we have about 70k individual tcp/http packets to sift through across the attack.

Here's an example request/response:

<img src="./images/CyberGames2020/SqlMap_SampleCap.jpg" alt="SQLMap Sample Packet Capture" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

The red text at the top is the GET request containing the SQLMap payload, and the blue is the web server's response. The vulnerable software appears to be a wordpress plugin called Chopslider. After some research for public Chopslider vulnerabilities, we discover that it has a CVE for a blind SQL injection bug on the `id` parameter - which looks like exactly what is being exploited here.

Now that we know we're dealing with a blind SQL injection attack, it helps us parse through the SQLMap's attack strategy a bit better. I don't have much SQL expertise, so I spent a few hours at this point just digging through HTTP requests and responses to uncover exactly how SQLMap exploits this vulnerability, and the SQL syntax it uses to accomplish it.

For example, the SQL injection from the above packet:

`id=1111111111 AND (SELECT 2004 FROM (SELECT(SLEEP(1-(IF(ORD(MID((SELECT IFNULL(CAST(display_name AS NCHAR),0x20) FROM wordpress.wp_users ORDER BY ID LIMIT 0,1),2,1))!=97,0,1)))))HXOU)`

is telling the server to sleep for 1 second if the second character of the first row (ordered by ID) of the the display_name column of the wordpress.wp_users table is not equal to 'a'. Keep in mind that ord('a')==97.

Because there is no way to see direct output from the sql query (in other words, we're 'blind'), SQLMap uses the HTTP response time to measure if the expression evaluated to true or false. Once this method of evaluating expressions is established, SQLMap can use comparison operators and simply brutefoce through all possible characters for the database name, tables, columns, values, etc. And that's how a blind SQL injection can dump an entire database.

1. Make a request that will cause the database to sleep for 1 second if your expression evaluates to false
2. Measure the HTTP response time
3. Go to step 1

There's a faster way to do this than bruteforce though. Enter: binary search. Valid database characters are constrained between decimals 0-128, so SQLMap chooses to use binary search to get through the database contents much faster than a linear bruteforce.

Here's an example of a random section of the pcap file shown in wireshark. You can see in the timestamp column that some requests are taking 1 second and most are not (you can also see that I've sorted by the "Protocol" column so that we only see the HTTP requests and not the TCP requests in between). This is blind SQL injection in action - SQLMap can determine if the result of the SQL expression it provided in the request is true or false based on the server's response time.

<img src="./images/CyberGames2020/SqlMap_Timing.jpg" alt="SQLMap Packet Timing Example" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

At this point I had been working on the CTF for over 23 hours straight, the scoreboard was closing soon, and I was struggling through writing a script that would 1) parse through each HTTP packet, 2) measure the response time, and 3) follow the binary search logic that SQLMap was performing, when I had an epiphany.

SQLMap has a quirk where it will always double-check the result of its binary search logic with a `!=` expression. For example, if it had narrowed down the search space for a character to 97 (after a series of `<` and `>` comparisons), it will always do a final check with `!= 97`.

I think that SQLMap does this because it has very little overhead cost in terms of time (because the server won't sleep if the expression is true, because of the `SLEEP 1-<expression>` you can see above), and it's an easy way for SQLMap to be doubly sure that nothing weird happened with the binary search logic.

As you may already see, this is has big implications. We basically know that every `!=` we see in the SQL expression of an HTTP GET request is SQLMap confirming the value of a database character. All we need to do now is filter for these requests, and parse out the value directly after the `!=`, to see everything that SQLMap is extracting, and avoid all the trial and error.

During the CTF I just did a Wireshark filter for `http contains '%21%3D'` and solved it manually by copying down the decimal ascii values after each `!=`, but here's a quick and dirty python script that uses tcpdump to print the raw packets, and some logic to get the ascii value of the ordinal just after the `!=`. Keep in mind that `%21%3D` is the URL encoding for `!=`, and that SQLMap has to use URL encoding because its payload is sent over an HTTP request. I'm filtering for the wp_users table here to trim the output because I know that's where the flag is, but it's not necessary. Also, the challenge description mentioned that the flag wouldn't have a `MetaCTF{}` wrapper.

<img src="./images/CyberGames2020/SqlMap_Python.jpg" alt="SQLMap Flag" width="800" style="vertical-align:middle;margin:0px 50px"/><br>

Although this challenge looks trivial once you see the solution, I enjoyed it a lot. It taught me some SQL and SQLMap quirks, and it was thrill to submit a 475 point flag ~15 minutes before the competition closed. 