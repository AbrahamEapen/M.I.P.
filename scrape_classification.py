# Dependencies
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
import time

def init_browser():
	executable_path = {'executable_path':'/usr/local/bin/chromedriver'}
	return Browser('chrome',**executable_path, headlead=False)

def scrape():
	browser = init_browser()
	classification = {}

	# Retrieve Density(g/cm^3)
	url = "http://meteorites.wustl.edu/id/density.htm"
	browser.visit(url)
	time.sleep(1)

	html = browser.html
	 = BeautifulSoup(html, 'html.parser')
	listTextedElem = news_soup.find('div', class_=)
	classification[] = 
	classification[] = 


	df = pd.read_html()
	df.columns = 

	table = df.to_html()
	table = table.replace('n','')

	classification[''] = table

	browser.quit()

	return classification