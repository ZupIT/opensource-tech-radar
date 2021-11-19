# Tech radar

## **Table of contents**
1. [**What is Tech-Radar?**](#What-is-Tech-Radar?)
2. [**Why?**](#Why?)
3. [**How to use it?**](#How-to-use-it?)
4. [**How to use it?**](#How-to-use-it?)
5. [**Serve the radar**](#Serve-the-radar)
6. [**Build the website**](#Build-the-website)


## **What is Tech-Radar?**

The Radar is a document that sets out the changes that are currently interesting regarding software development.  
It is published by a company called Thoughtworks.  
You can find more information about it [here](https://www.thoughtworks.com/radar/faq).

## **Why?**

I have developed this radar because in many organizations we want to document the usage of technologies in an easy way.
People who wants to document something just need to push a new md file in the repository.

![tech-radar](static/images/preview.png)

![tech-radar](/static/images/preview-rings.png)

## **Assets information**

The logos of each technology must be square, preferably 58x58 px

## Setup your dev environment
[Install hugo](https://gohugo.io/getting-started/installing/) or simply add the binary file at the root of the repository

## Serve the radar
```
hugo -w server
```

## Build the website
```
hugo --config prod.toml
```
