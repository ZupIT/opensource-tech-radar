# **Contributing Guide**

This is Zup Open Source Tech-Radar contributing guide. Please read the following sections to learn how to ask questions and how to work on something.

## **Table of contents**
1. [**Before you contribute**](#before-you-contribute)
> #### 1.1. [**Code of Conduct**](#code-of-conduct)
> #### 1.2. [**Legal**](#legal)
2. [**Prerequisites**](#prerequisites)
 > #### 2.1.   [**Developer Certificate of Origin**](#developer-certificate-of-origin)
> #### 2.2.  [**Code Review**](#code-review)
> #### 2.3. [**Pull Requests**](#pull-requests)    
3. [**How to contribute?**](#how-to-contribute?)
> #### 3.1. [**Prepare your development environment**](#prepare-your-development-environment)
> #### 3.2.  [**First contribution**](#first-contribution)
> #### 3.3. [**Add new feature, bug fixing or improvement**](#add-new-feature-bugfixing-or-improvement)
> #### 3.4.  [**Pull Request's approval**](#pull-request-approval)
> #### 3.5.   [**After your pull request's approval**](#after-your-pull-request-approval)
4. [**Community**](#community)

## **Before you contribute**

### **Code of Conduct**
Please follow the [**Code of Conduct**](CODE_OF_CONDUCT.md) in all your interactions with our project.

### **Legal**
- Tech-Radar  is licensed over [**MIT License**](LICENSE).

- All contributions are subject to the [**Developer Certificate of Origin (DCO)**](https://developercertificate.org). 
When you commit, use the ```**-s** ``` option to include the Signed-off-by line at the end of the commit log message.

## **Prerequisites**
Check out the requisites before contributing to Tech-Radar:

### **Developer Certificate of Origin - DCO**

 This is a security layer for the project and for the developers. It is mandatory.
 
 Follow one of these two methods to add DCO to your commits:
 
**1. Command line**
 Follow the steps: 
 **Step 1:** Configure your local git environment adding the same name and e-mail configured at your GitHub account. It helps to sign commits manually during reviews and suggestions.

 ```
git config --global user.name “Name”
git config --global user.email “email@domain.com.br”
```
**Step 2:** Add the Signed-off-by line with the `'-s'` flag in the git commit command:

```
$ git commit -s -m "This is my commit message"
```
**2. GitHub website**

You can also manually sign your commits during GitHub reviews and suggestions, follow the steps below: 

**Step 1:** When the commit changes box opens, manually type or paste your signature in the comment box, see the example:

```
Signed-off-by: Name < e-mail address >
```

For this method, your name and e-mail must be the same registered on your GitHub account.

### **Code Review**
- All your submissions needs a review.

### **Pull Requests**
When you open a Pull Request, follow the requirements below:
1. You need to add a title describing the issue. 
2. Answer the questions about what you did, how to verify it and a description for the changelog, see an example:


## **How to contribute?** 
See the guidelines to submit your changes: 

### **Prepare your development environment**
To start contributing with Tech-Radar you first need to:
- Install [**Go**](https://golang.org/dl/). The minimal version required to build is 1.17. 
- Install [**Hugo**](https://gohugo.io/getting-started/installing/).


### **First contribution**
Contributing to a new feature is only allowed in the [**main repository**](https://github.com/ZupIT/opensource-tech-radar).


### **Add new feature, bug fixing or improvement**
If you want to add an improvement, a new feature or bugfix, follow the steps to contribute: 

**Step 1:** Make sure your branch is based on main;

**Step 2:** Open an issue;

**Step 3:** Make your changes and open a GitHub pull request;

**Step 4:** Make sure to write a title describing what you have done;

**Step 5:** Fill in the template in the PR, here you need to write what you did and how the team can verify it; 

**Step 6:** You must commit to comply with the DCO rules. It will need to be [**signed-off**](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--s) and [**verified**](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/about-commit-signature-verification). Example: ` git commit -s --amend`.


### **Pull Request's approval**
Your pull request is approved when:
- 2 code owners approve it.
- Pass all GitHub actions checking process (lint, test, coverage, license, build, e2e, security, dco).

### **After your pull request's approval**
- If it is a bug fix, the team will perform the changes and there will be a new release.
- If it is a feature, it will be in the next release. 

## **Community**

- Let's chat in our [**forum**](https://forum.zup.com.br).

Thank you for your contribution, you rock! 🚀