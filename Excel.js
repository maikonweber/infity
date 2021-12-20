const fs = require('fs');
const csv = require('fast-csv');
const stream = fs.createReadStream('Cadastro-de-Clientes.csv');
const axios = require('axios')


csv.parseStream(stream, {headers: true})
    .on('data', async function (data){
      
        if (data['Nome Fantasia '] != '') {
        const objectKet = Object.keys(data)
        const Nome_Fantasia = data[objectKet[0]]
        const Responsavel = data[objectKet[1]]
        const telefone = data[objectKet[2]]
        const rua = data[objectKet[3]]
        const bairro = data[objectKet[4]]
        const cidade = data[objectKet[5]]
        const Atividade = data[objectKet[6]]
        console.log(telefone)
       
        // createContact(Nome_Fantasia, Responsavel, telefone, rua, bairro, cidade, Atividade)
        searchIdbyNumber(telefone)
      
        
      

    }})

  

    function createContact(nome_ , resp_, tel_, rua_, bairro_, cidade_, atividade_) {
        const url = 'https://api.infinitychat.com.br/core/v2/api/contacts'
        const data ={
            "genericAttributes": [
                    {
                      "key": "atividade",
                       "value": atividade_,
                      "description": "Atividade"
                        },
                    {
                        "key": "string",
                       "value": "string",
                      "description": "string"
                    
                    }
                ],
            "nickName": "Nome pessoa",
            "email": "teste",
            "number": "9999929999299",
            "observation": "teste observacao",
            "tags": [
                {
                    "id": "61007c24d6670f1d88f117be",
                    "organizationId": "60d1d181aa92eb60e9052aa7",
                    "hexColor": "#0c65b4",
                    "description": "suporte"
                }
            ]
        }

   const response  = await axios.post( url, {"body": data}, {
            headers: {
            "Content-Type": "application/json",
            "access-token":"61b36cae3ec41a5571351eb6"
            }
          }
        )

    return JSON.parse(response)

    } 




     async function searchIdbyNumber(number) {
        const url = 'https://api.infinitychat.com.br/core/v2/api/contacts/number/' + number
        console.log(url)
       
        const response = await axios.get( url, {
            headers: {
            "Content-Type": "application/json",
            "access-token":"61b36cae3ec41a5571351eb6"
            }
            })

        // Convert into a json object
        return JSON.parse(response)


        }      
        
    function setAtributos(id, atributos) {
        const url = `https://api.infinitychat.com.br/core/v2/api/chats/${id}/set-attributes`
        const data = [{
            "key": 'bairro',
            "value": atributos['address']['neighborhood'],
            "description": 'Bairro',
        }, 
        {
            "key": 'rua',
            "value": atributos['address']['street'],
            "description": atributos,
        },
        {
            "key": 'Cidade',
            "value": atributos['address']['city'],
            "description": 'Cidade',
       
        },
        {
            "key": 'Atividade',
            "value": atributos['activity'],
            "description": 'Atividade',
        }
    ]

        axios.post( url, {"body": data}, {
            headers: {
            "Content-Type": "application/json",
            "access-token":"61b36cae3ec41a5571351eb6"
            }
            }
            ).then(response => {
                if (response.status == 200) {
                    console.log('Atributos setados com sucesso')
                    return response
                }
            })

        }

    

