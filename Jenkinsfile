def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.15.11', command: 'cat', ttyEnabled: true),
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  hostPathVolume(mountPath: '/app', hostPath: '/'),
]) {
  node(label) {
    def staticServer
    def developers

    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def shortGitCommit = "${gitCommit[0..10]}"
    def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)
    def registry = env.DOCKER_REGISTRY

    def staticServerImageName = "apiscore-static"
    def staticServerImage = "${registry}/${staticServerImageName}"

    container('docker') {
      stage('Build') {
        checkout scm
        staticServer = docker.build("${staticServerImage}", "-f static/Dockerfile ./static/src")
      }
      stage('Push') {
        docker.withRegistry('https://' + env.DOCKER_REGISTRY) {
          staticServer.push("latest")
        }
      }
    }

    stage('Deploy (kubectl)') {
      container('kubectl') {
        sh """
          # without tagging, rollout will not be triggered
          # patch, to force rollout (development envs only)

          # kubectl set image -n apis deployment/gateway \
          #   gateway=theapis/apis-core-gateway:latest \
          #   bitcoin-rpc=theapis/apis-core-bitcoin-rpc:latest \
          #   bitcoin-listener=theapis/apis-core-bitcoin-listener:latest \
          #   ethereum-rpc=theapis/apis-core-ethereum-rpc:latest \
          #   ethereum-listener=theapis/apis-core-ethereum-listener:latest
          #   # static=${staticServerImage}:latest # does not exist in dev

          # kubectl patch -n apis deployment/gateway -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'

          kubectl rollout restart -n apis deployment \
            gateway \
            ethereum-listener-mainnet \
            ethereum-listener-rinkeby \
            ethereum-rpc-mainnet \
            ethereum-rpc-rinkeby

          """
      }
    }
  }
}
