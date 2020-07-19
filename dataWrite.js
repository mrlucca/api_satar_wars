const service = require('./service')
const fs =  require('fs')

async function main() {
    try { 

        //Começando abrindo um novo documento de texto 
        fs.writeFile('dadosPersonagensStarWars.txt', '> Dados dos personagens do  Star Wars < \n', (err) => {
            if(err) throw err;
            console.log('Arquivo salvo')
        })

        const result = await service.getPeople('a')
        // results está dentro do array retornado pela api
        const dadosProntos = []
        let filmePorPersonagem = []
        let diretor_produtor_data = []

        for(let data of result.results){
            for(filme of data.films){
                let fi = await service.getFilms(filme)
                filmePorPersonagem.push(`> ${fi.title} \n ------------------\n`)
                diretor_produtor_data.push(fi.director, fi.producer, fi.release_date)


            }
            let formater = `
-------------Dados do Personagem----------------
>>  Nome: ${data.name}
>>  Cor do cabelo: ${data.hair_color} 
>>  Cor dos olhos: ${data.eye_color} 
>>  Altura: ${data.height} 
>>  Diretor: ${diretor_produtor_data[0]} Produtor: ${diretor_produtor_data[1]}
>>  Data de apresentação: ${diretor_produtor_data[2].toString().replace('-', '/').replace('-', '/')}
>>  Participação em filmes: \n`
            
            fs.appendFile('dadosPersonagensStarWars.txt', formater, function (err) {
                if (err) throw err;
                console.log('Updated data character!');
            })
            
            for (let i of filmePorPersonagem){
                fs.appendFile('dadosPersonagensStarWars.txt', i, function (err) {
                    if (err) throw err;
                    console.log('Updated data movie!');
                })
            }
            
            filmePorPersonagem = []
            diretor_produtor_data = []
        }

        console.log('DADOS SALVOS!')
       
    }catch (err) {
        console.error('Não conseguimos obter os dados: ', err)
    }
}

main()

