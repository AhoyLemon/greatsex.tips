#!/usr/bin/env python                   
# -*- coding: utf-8 -*-
from random import choice,randint
from subprocess import Popen,PIPE,STDOUT
from greatsextips_keys import *
import os
import textwrap
import mmap
import tweepy
from blowJobs import blowjob
from bondageTips import bondagetip
from dancesForHim import danceforhim
from doThingsToHisGenitals import dothingtohisgenitals
from dirtyTalkExamples import dirtytalkexample
from dressUpAndSay import dressupandsay
from handJobs import handjob
from hideAnItem import hideanitem
from nonPenisActionsFromMen import nonpenisaction
from preambles import preambles
from reallyUncreativeSexTips import reallyuncreativesextip
from sensualMensTips import sensualmenstip
from suggestionsFromWomen import suggestionfromwomen

auth = tweepy.OAuthHandler(twitter_consumer_key, twitter_consumer_secret)
auth.set_access_token(twitter_token_key, twitter_token_secret)
api = tweepy.API(auth)

basedir = "/home/vgan/greatsextips/"

sextipimage = basedir + "sextip.jpg"
sexTipImage = open(sextipimage)
sextipsfile = basedir + "sextips.txt"

def sendToInterwebs(sextipimage,sexTipImage,sextip,tipnumber):
        try:
                tweet_text = tipnumber + "\n" + sextip
                status = api.update_with_media(sextipimage,status=tweet_text , file=sexTipImage)
        except:
                print "tweeting failed :("

def getTipNumber():
        num1 = randint(0,99)
	num2 = randint(100,9999)
        num = str(num1) + "," + str(num2)
	tipnumber = "Great Sex Tip #" + num
        return tipnumber

def getSexAct():
	sexacts = [ blowjob,bondagetip,danceforhim,dirtytalkexample,dothingtohisgenitals,dressupandsay,handjob,hideanitem,nonpenisaction,reallyuncreativesextip,suggestionfromwomen] 
	sexact = choice(sexacts)
        if os.path.isfile(sextipsfile):
                sexTips = open(sextipsfile,"a+")
                sextipsmm = mmap.mmap(sexTips.fileno(), 0, access=mmap.ACCESS_READ)
                while sextipsmm.find(sexact) != -1: # tip not unique try another
			sexact = choice(sexacts)
       		sexTips.write(sexact + "\n") # store text to check for uniqueness
                sexTips.close()
        else:
                print sextipsfile + " does not exist..."
	return sexact

def wrapIt(sexact):
	wrappedsexact='\n'.join(textwrap.wrap(sexact, 40))
	return wrappedsexact

def makeBG():
	bgImages = ['bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','bg6.jpg','bg7.jpg','bg8.jpg','bg9.jpg','bg10.jpg']
	bgimage = basedir + "img/" + choice(bgImages)
	bgColors = ['#622927', '#150f4b', '#073615', '#230622', '#061e26', '#232405', '#210512']
	bgcolor = choice(bgColors)
        bgCmd = [ "/usr/bin/convert", "-fill", bgcolor, "-colorize", "50%", bgimage, sextipimage ]
        p1 = Popen(bgCmd, stdin=PIPE, stdout=PIPE, stderr=STDOUT)
        p1_output = p1.stdout.read()

def justtheTip(wrappedsextip):
	font = basedir + "fonts/Edmundsbury_Serif.ttf"
        points = "40"
        text_gravity = "North"
        h_offset = "+0"
        v_offset = "+370"
        sextipcmd = [ "/usr/bin/convert", sextipimage, "-fill", "white", "-stroke", "Gray","-draw","rectangle 400,250 1200,700","-pointsize" , str(points),"-font",font, "-fill", "Black", "-gravity", text_gravity, "-annotate",h_offset + v_offset, wrappedsextip, sextipimage ]
        p2 = Popen(sextipcmd, stdin=PIPE, stdout=PIPE, stderr=STDOUT)
        p2_output = p2.stdout.read()

	
def addTipNumber(tipnumber):
        points = "36"
        text_gravity = "North"
        h_offset = "-230"
        v_offset = "+280"
        tipnumbercmd = [ "/usr/bin/convert", sextipimage, "-fill", "red", "-stroke", "DarkRed","-draw","rectangle 370,270 770,320","-pointsize" , str(points), "-font","bold","-fill", "White", "-gravity", text_gravity, "-annotate",h_offset + v_offset, tipnumber, sextipimage ]
        p2 = Popen(tipnumbercmd, stdin=PIPE, stdout=PIPE, stderr=STDOUT)
        p2_output = p2.stdout.read()


def cleanup():
	if os.path.isfile(sextipimage):
        	os.remove(sextipimage)

sexact = getSexAct()
wrappedsextip = wrapIt(sexact)
makeBG()
justtheTip(wrappedsextip)
tipnumber = getTipNumber()
addTipNumber(tipnumber)
sendToInterwebs(sextipimage,sexTipImage,sexact,tipnumber)

