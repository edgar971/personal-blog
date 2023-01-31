---
title: 'See how many files are in each directory for a give directory'
date: '2017-06-07'
slug: '/2017/06/07/see-how-many-files-are-in-each-directory-for-a-give-directory'
---

### Problem

I needed to know how many files were under each directory for the directory I was on in Linux. A simple `ls -la` just gives you the number of files under your current directory, not sub directories.

```bash
ls -la
total 32
drwxr-xr-x   14 edgarpino  staff    476 Jun  6 23:17 .
drwxr-xr-x   17 edgarpino  staff    578 Jun  2 15:03 ..
drwxr-xr-x   14 edgarpino  staff    476 Jun  6 23:17 .deploy_git
drwxr-xr-x   13 edgarpino  staff    442 Jun  6 23:16 .git
-rw-r--r--    1 edgarpino  staff     71 May 29 12:34 .gitignore
drwxr-xr-x    6 edgarpino  staff    204 Jun  7 09:28 .idea
-rw-r--r--    1 edgarpino  staff   1841 Jun  4 11:05 _config.yml
-rw-r--r--    1 edgarpino  staff    174 Jun  7 09:24 db.json
drwxr-xr-x  297 edgarpino  staff  10098 Jun  2 16:19 node_modules
-rw-r--r--    1 edgarpino  staff    592 Jun  2 16:19 package.json
drwxr-xr-x   13 edgarpino  staff    442 Jun  6 23:17 public
drwxr-xr-x    5 edgarpino  staff    170 May 28 09:29 scaffolds
drwxr-xr-x    7 edgarpino  staff    238 Jun  3 10:53 source
drwxr-xr-x    4 edgarpino  staff    136 Jun  2 16:51 themes
```

### Solution

The solution for me was simple:

1. Loop through all directories using the find command with a maxdepth of 1.
1. Count the number of files under each given directory.
1. Echo the directory and the number of files.

```bash
for dir in $(find . -maxdepth 1 -type d) ; do
    echo -n $dir": " ;
    ( find $dir -type f | wc -l ) ;
done
```

You can create a simple bash script or just paste it on your terminal window.

The output should be something like this:

```bash
.:    10826
./.deploy_git:     1407
./.git:      427
./.idea:        3
./node_modules:     8611
./public:      143
./scaffolds:        3
./source:       45
./themes:      183
```
