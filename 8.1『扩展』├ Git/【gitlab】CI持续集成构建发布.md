[GitLab CI/CD 基础教程](https://blog.csdn.net/bingfeilongxin/article/details/88326984)




# GitLab CI/CD 基础教程

# 1.基本概念
## 1.1 CI/CD
CI，Continuous Integration，为持续集成。即在代码构建过程中持续地进行代码的集成、构建、以及自动化测试等；有了 CI 工具，我们可以在代码提交的过程中通过单元测试等尽早地发现引入的错误；
CD，Continuous Deployment，为持续交付。在代码构建完毕后，可以方便地将新版本部署上线，这样有利于快速迭代并交付产品。

## 1.2 GitLab CI/CD
GitLab CI/CD（后简称 GitLab CI）是一套基于 GitLab 的 CI/CD 系统，可以让开发人员通过 .gitlab-ci.yml 在项目中配置 CI/CD 流程，在提交后，系统可以自动/手动地执行任务，完成 CI/CD 操作。而且，它的配置非常简单，CI Runner 由 Go 语言编写，最终打包成单文件，所以只需要一个 Runner 程序、以及一个用于运行 jobs 的执行平台（如裸机+SSH，Docker 或 Kubernetes 等，我推荐用 Docker，因为搭建相当容易）即可运行一套完整的 CI/CD 系统。

下面针对 Gitlab CI 平台的一些基本概念做一个简单介绍：

Job
```
Job 为任务，是 GitLab CI 系统中可以独立控制并运行的最小单位。 在提交代码后，开发者可以针对特定的 commit
完成一个或多个 job，从而进行 CI/CD 操作。
```

Pipeline
```
Pipeline 即流水线，可以像流水线一样执行多个 Job. 在代码提交或 MR 被合并时，GitLab 可以在最新生成的 commit
上建立一个 pipeline，在同一个 pipeline 上产生的多个任务中，所用到的代码版本是一致的。
```

Stage
```
一般的流水线通常会分为几段；在 pipeline
中，可以将多个任务划分在多个阶段中，只有当前一阶段的所有任务都执行成功后，下一阶段的任务才可被执行。
```


# 2. CI/CD 流程配置

## 2.1 完整定义
GitLab 允许在项目中编写 .gitlab-ci.yml 文件，来配置 CI/CD 流程。

下面，我们来编写一个简单的测试→构建→部署的 CI/CD 流程。

首先，可以定义流程所包含的阶段。我们的流程包含三个阶段：测试、构建和部署。
在 .gitlab-ci.yml 的开头，定义好所有阶段、以及执行每个任务之前所需要的环境变量以及准备工作，然后定义整个流程中包含的所有任务：

```
stages:
  - test
  - build
  - deploy

variables:
  IMAGE: docker.registry/name/${CI_PROJECT_NAMESPACE}-${CI_PROJECT_NAME}

before_script:
  - IMAGE_TAG=${IMAGE}:${CI_COMMIT_SHA:0:8}

test_all:
  image: "pymicro"
  stage: test
  services:
    - name: mysql:5.6
      alias: mysql
  veriables:
    MYSQL_DATABASE: db
    MYSQL_ROOT_PASSWORD: password
  before_script:
    - pip install -U -r requirements.txt
  script:
    - flake8 app
    - pytest tests

build_image:
  image: "docker:17.11"
  stage: build
  services:
    - name: "docker:17.12.0-ce-dind"
      alias: dockerd
  variables:
    DOCKER_HOST: tcp://dockerd:2375
  only:
    - master
  tags:
    - build
  script:
    - docker build -t ${IMAGE_TAG} -f Dockerfile .
    - docker push ${IMAGE_TAG}

deploy_production:
  stage: deploy
  variables:
    GIT_STRATEGY: none
  only:
    - master
  when: manual
  tags:
    - deploy-production
  script:
    - kubectl set image deploy/myproject "app=${IMAGE_TAG}" --record
```










