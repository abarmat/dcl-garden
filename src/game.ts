// TODO: an OpenSea NFT helper
// TODO: random background color

const CONTRACT_ADDRESS = '0x74f1241adda635f3f2e214543a39bee0bb7c0fef'
// const CONTRACT_ADDRESS = '0x2a46f2ffd99e19a89476e2f62270e0a35bbf0756'

async function fetchAssetContract(contractAddress: string) {
  const url = `https://api.opensea.io/api/v1/asset_contract/${contractAddress}/`
  let response = await fetch(url)
  return response.json()
}

function createNFTShape(contractAddress: string, tokenId: string) {
  const entity = new Entity()
  const shapeComponent = new NFTShape(
    `ethereum://${contractAddress}/${tokenId}`
  )
  entity.addComponent(shapeComponent)
  return entity
}

function spiralCoordsAtStep(step) {
  const angle = 0.12 * step
  const x = (1 + angle) * Math.cos(angle)
  const y = (1 + angle) * Math.sin(angle)
  return { x, y }
}

function spiralTransformAt(step) {
  const spiral = spiralCoordsAtStep(step)
  return new Transform({
    position: new Vector3(spiral.x, 1.5, spiral.y)
  })
}

executeTask(async () => {
  try {
    // const assetContract = await fetchAssetContract(CONTRACT_ADDRESS)
    const tokenCount = 150 // assetContract.stats.count

    log(tokenCount)
    for (let tokenId = 1; tokenId < tokenCount; tokenId++) {
      const entity = createNFTShape(CONTRACT_ADDRESS, String(tokenId))
      entity.addComponent(spiralTransformAt(tokenId - 1))
      engine.addEntity(entity)
    }
  } catch {
    log('failed to reach URL', error)
  }
})
