# **Tech-Radar**

## **Table of contents**
1. [**What is Tech-Radar?**](#what-is-tech-radar?)
2. [**Why?**](#why?)
3. [**How to use it?**](#how-to-use-it?)
4. [**How to use it?**](#how-to-use-it?)
5. [**Serve the radar**](#serve-the-radar)
6. [**Build the website**](#build-the-website)


## **What is Tech-Radar?**

The Radar is a document that sets out the changes that are currently interesting regarding software development. It is published by a company called Thoughtworks.  
For more information, check out [the FAQ section](https://www.thoughtworks.com/radar/faq).

## **Why?**

The teams have developed this radar because in many organizations we want to document the usage of technologies in an easy way. People who want to document something just need to push a new MD file in the repository.

![tech-radar](static/images/preview.png)

![tech-radar](/static/images/preview-rings.png)

## **Assets information**

The logos of each technology must be square, preferably 58x58 px.

## **Setup your dev environment**
You should [**Install Hugo**](https://gohugo.io/getting-started/installing/) or you can add the binary file at the root of the repository.

## **Serve the radar**
Run the command below: 

```
hugo -w server
```

## **Build the website**
Run the command below: 

```
hugo --config prod.toml
```
