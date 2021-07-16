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
          kubectl rollout restart -n apis deployment \
            apis-core-binance-smart-chain-mainnet \
            apis-core-binance-smart-chain-testnet \
            apis-core-bitcoin-mainnet \
            apis-core-bitcoin-testnet \
            apis-core-ethereum-mainnet \
            apis-core-ethereum-rinkeby \
            apis-core-gateway
          """
      }
    }
  }
}
