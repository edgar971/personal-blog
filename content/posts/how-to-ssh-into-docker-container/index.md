---
title: 'How To SSH Into Docker Container'
date: '2017-06-06'
slug: '/2017/06/06/how-to-ssh-into-docker-container/'
---

### Problem

Sometimes you need you access a container to debug or to access a command line tool available inside.

### Solution

When the container is running you can use the [exec](https://docs.docker.com/engine/reference/commandline/exec/) Docker command to run a command in a running container. If you are using the Ubuntu image then this is how you SSH or bash into it a Docker container:

```bash
docker exec -it ubuntu_container bash
```

Note the `--it` option which allows you to keep STDIN open even if not attached and allocate a pseudo-TTY. You can also run a command under given user by using the `-u` option. See the official [exec Docker documentation](https://docs.docker.com/engine/reference/commandline/exec/#usage) for more info.

If the above does not work for you or if you are using a different Linux distribution the try the following:

```bash
docker exec -it some_container /bin/bash
```
