const app = new Vue(
    {
        el : "#app",

        data : {

            activeContactIndex : 0,

            userMessage : "",

            searchQuery : "",

            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novit???',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
        },

        methods : {

            changeActiveIndex : function(selectedContactIndex){
                this.activeContactIndex = selectedContactIndex;
            },

            sendUserMessage : function(userMessage){
                
                if(userMessage != ""){
                    const sendingTimestamp = dayjs();
                    const newMessage = {

                        date: sendingTimestamp,
                        message : userMessage,
                        status : 'sent'
                    }

                    this.contacts[this.activeContactIndex].messages.push(newMessage);

                    this.userMessage = "";

                    setTimeout(() => {
                        this.sendAutoReply();
                    }, 1000)
                }
            },

            sendAutoReply : function(){

                const sendingTimestamp = dayjs();
                const newMessage = {

                    date: sendingTimestamp,
                    message : "OK",
                    status : 'received'
                }

                this.contacts[this.activeContactIndex].messages.push(newMessage);

            },

            searchContact : function(index){
                const contactName = this.contacts[index].name.toLowerCase();
                const searchedName = this.searchQuery.toLowerCase();
                return (contactName.includes(searchedName));
            },


            deleteMessage : function(index){
                this.contacts[this.activeContactIndex].messages[index].status = "deleted";
            },

            
            frenchToAmericanDateConversion : function(datetime){
                const datePortion = datetime.split(" ")[0];
                const americanDate = datePortion.split("/")[1] + "/" + datePortion.split("/")[0] + "/" + datePortion.split("/")[2] + " " + datetime.split(" ")[1];
                return americanDate;
            },
            
        
            getLastMessageDateAndTime : function(messageList){
                const receivedMessages = this.filterReceivedMessages(messageList);
                const lastMessageDatetime = receivedMessages[receivedMessages.length - 1].date;
                if (lastMessageDatetime != ""){
                    let currentDate = dayjs(lastMessageDatetime).format("DD/MM/YY");
                    if (currentDate == dayjs().format("DD/MM/YY")){
                        currentDate = "oggi";
                    }
                    const currentTime = this.datetimeFormatToHourAndMinutes(dayjs(lastMessageDatetime));
                    return [currentDate, currentTime];
                }
                
            },
            

            datetimeFormatToHourAndMinutes : function(datetime){
                if (datetime != ""){
                    return dayjs(datetime).format("HH:mm");
                }
            },


            filterReceivedMessages : function(messageList){
                const receivedMessages = messageList.filter((element) => {
                    if (element.status == "received"){
                        return true
                    };
                })
                return receivedMessages;
            }
        },


        created() {
            for (let i = 0; i < this.contacts.length; i++){
                const messagesList = this.contacts[i].messages
                for (let i = 0; i < messagesList.length; i++){
                    messagesList[i].date = this.frenchToAmericanDateConversion(messagesList[i].date);
                }
            }
        }
    }
)