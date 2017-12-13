# A Python Twitter Bot version of Great Sex Tips!

This requires a couple of packages to run:

* Tweepy - Twitter API wrapper.
* ImageMagick - This gets called as a subprocess, so it actually just uses the command line version.

Install prereqs:

```
pip install tweepy

yum / apt-get install ImageMagick
```

* Add your working dir path to greatsextips.py
* Add your Twitter API creds to greatsextips_keys.py

Run it on a schedule via cron:

```
0 */6 * * * vgan python /home/vgan/greatsex.tips/greatsextips.py > /home/vgan/greatsex.tips/greatsextips_cron.log 2>&1
```
