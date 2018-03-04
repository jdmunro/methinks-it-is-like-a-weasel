const TARGET = "METHINKS IT IS LIKE A WEASEL"
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "
const MUT_PROB = 10
const POOL_SIZE = 500

const getRandomCharacter = () => {
    return ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
}

const generateGenome = () => {
    let characters = []
    
    for (let i = 0; i < 28; ++i) {
        characters.push(getRandomCharacter())
    }
    
    return characters.join('')
}

const getFitness = (genome) => {
    let fitness = 0
    
    for (let i = 0; i < genome.length; ++i) {
        if (genome.charAt(i) === TARGET.charAt(i)) {
            ++fitness
        }
    }
    
    return fitness
}

const getGenePool = () => {
    let genePool = []
    
    for (let i = 0; i < POOL_SIZE; ++i) {
        genePool.push(generateGenome())
    }
    
    return genePool
}

const breed = (a, b) => {
    let offspring = ''

    for (let i = 0; i < a.length; ++i) {
        if (a.charAt(i) !== TARGET.charAt(i)) {
            offspring += b.charAt(i)
        } else {
            offspring += a.charAt(i)
        }
    }

    return offspring
}

const getEvolvedGenePool = (oldGenePool) => {
    const sortedPool = oldGenePool.sort((a, b) => getFitness(b) - getFitness(a))
    const a = sortedPool[0]
    const b = sortedPool[1]
    const newGenome = breed(a, b)
    const newGenePool = []

    newGenePool.push(newGenome)

    for (let i = 0; i < POOL_SIZE - 1; ++i) {
        newGenePool.push(doMutation(newGenome))
    }

    return newGenePool
}

const getFittest = (genePool) => {
    const sortedPool = genePool.sort((a, b) => getFitness(b) - getFitness(a))
    return sortedPool[0]
}

const doMutation = (genome) => {
    let mutatedGenome = ''

    for (let i = 0; i < genome.length; ++i) {
        if (genome.charAt(i) === TARGET.charAt(i)) {
            mutatedGenome += genome.charAt(i)
        } else if (Math.floor((Math.random() * 100) + 1) <= MUT_PROB) {
            mutatedGenome += getRandomCharacter()
        } else {
            mutatedGenome += genome.charAt(i)
        }
    }

    return mutatedGenome
}

const evolve = () => {
    const genome = generateGenome()
    let genePool = getGenePool()
    let iteration = 0

    console.log(genome)
    
    while (getFitness(getFittest(genePool)) < 28) {
        ++iteration
        
        console.log(`${getFittest(genePool)} (${getFitness(getFittest(genePool))})`)
        
        genePool = getEvolvedGenePool(genePool)
    }

    console.log(`${getFittest(genePool)} (${getFitness(getFittest(genePool))})`)
    console.log(`Target found after ${iteration} iterations`)
    
    return getFittest(genePool)
}

evolve()
