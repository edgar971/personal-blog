---
title: 'Today I Learned'
date: '2019-01-09'
---

### 2019-03-14

#### How to split a CSV file using `split`

`split` is a Unix command used to split a file into pieces. It can be used like this:

```bash
split -l 100000 large.csv segment
```

The command above splits a file with a limit of 100k lines each. If the file is 300k then it will create 3 files.

You can also use a maximum number of bytes by using the `-b` flag:

```bash
split -b 40k large.csv segment
```

### 2019-01-26

- How Support Vector Machines work:
  1. [Support Vector Machine — Introduction to Machine Learning Algorithms](https://towardsdatascience.com/support-vector-machine-introduction-to-machine-learning-algorithms-934a444fca47)
  1. [Chapter 2 : SVM (Support Vector Machine) — Theory](https://medium.com/machine-learning-101/chapter-2-svm-support-vector-machine-theory-f0812effc72)

---

### 2019-01-14

#### Clean Git Repository with Tracked and Untracked file

```bash
git checkout master
git clean -dxf
git reset --hard
```

---

### 2019-01-10

---

#### Build to Learn by Jeff Patton

- Building to learn means doing things as cheap experiments. Once you’ve learned that users actually want the feature, you can then spend full engineering rigor toward building to earn. You will likely end up throwing away your “learn” code.
- Building software is one of the most expensive ways to learn.
- Shipping small things is always easier.
- Code is a liability. Knowledge is an asset.
- Directed Discovery is a form of “building to learn”. We don’t have to build software to learn. We can use prototypes or wireframes.

---

### 2019-01-09

- [Basics of Natural Language Processing](https://medium.com/@ageitgey/natural-language-processing-is-fun-9a0bff37854e).
- `spaCy` and `textacy` NLP libraries.
- [Sourcegraph](https://github.com/sourcegraph/sourcegraph): Code search and intelligence
