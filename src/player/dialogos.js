const dialogs = {
  //Dialogo em português
  pt: {
    dialogo_cena_predio: [
      'Olá, seja bem-vindo ao nosso jogo. \nEntre no prédio para contratar \nfornecedores. '
    ],
    dialogo_cena_escritorio: [
      'Olá, Tyler. Seja bem-vindo!',
      'Me chamo Vanessa, sou do time de Diversity \nSupply da Meta.',
      'Hoje é o grande dia do seu treinamento!',
      'Juntamente com o time de Inovação estamos testando \numa nova forma de treinamento para ensinar sobre \nas etapas do processo de contratação de fornecedores.',
      'Esse treinamento é imersivo, e ocorre totalmente \nno Metaverso.',
      'Então, para começar, se aproxime do Meta Quest',
      'Quando se sentir preparado é só começar',
      'Boa sorte! Até mais!',

    ], 

    dialogo_cena_escritorio_volta: [
      'Bem vindo de volta, Tyler.',
      'Para resumir, a última etapa do \nprocesso de contratação é a finalização do contrato.',
      'Aqui você decide como vai proceder em relação\nao fornecedor.',
      'Você pode desejar manter relações \ncom ele para serviços futuros e acompanhá-lo, ou \npode optar por se desvincular totalmente dele. ',
      'Mas seu horário de expediente já acabou\ne a equipe de desenvolvimento me informou que \nessa parte ainda não está pronta no treinamento.',
      'Então, por hoje é só',
      'Tchau!'
    ], 
    
    dialogo_cena_exterior_npc1: [
      'Olá, sou o dono da loja'
    ],

    dialogo_cena_exterior_npc2: [
      'Olá, sou o Guarda'
    ],

    dialogo_cena_exterior_informacao: [
      'Castelo logo a frente!'
    ],

    dialogo_cena_corredor_npc: [
      'Você está no castelo do rei, \n de o seu melhor para ajuda-lo!'
    ],

    dialogo_cena_corredor_banner: [
      'Esse parece ser o emblema do reino!'
    ],

    texto_boasvindas_castelo:[
      "Bem-vindo a Sala do Rei"
    ],
    
    dialogo_cena_castelo: [ //dialogo etapa 1
      'Tyler, você chegou! Que maraviha! ',
      'Sei que deve estar um pouco confuso, então deixe-me que explique\no que está acontecendo...',
      'Preciso de sua ajuda. Após anos de pesquisa o reino da Meta foi\ncapaz de desenvolver um dispositivo que consegue criar\nuniversos dentro de um capacete. Decidimos chamá-lo de\nMeta Quest 3 Pro.',
      'Iremos anunciar nossa criação em um evento aqui no castelo:\nA Meta Connect',
      'Um grande festival com pessoas de vários reinos. Mas, para isso,\npreciso de ajuda para contratar fornecedores que prestem \nserviços para a festa...',
      'Você pode nos ajudar?',
      'Excelente, Tyler! Vamos começar, mas antes...',
      'É imprescindível que os fornecedores contratados sigam os \nnossos princípios.  Não podemos nos filiar pessoas que tenham \nhistórico de infração dos direitos humanos. Por isso, \nevite empresas que tenham envolvimento com escândalos \ndessa natureza ou com ações antiéticas. ',
      'É importante pensar, também, na diversidade das empresas \nque contratamos. Aqui valorizamos a pluralididade de visões, \nentão evite as empresas pouco diversas.',
      'O lançamento do Meta Quest 3 pro é uma grande novidade, \nportanto, precisamos garantir que nenhuma informação saia antes da hora.  \nPeça que os fornecedores assinem o NDA, um acordo de \nconfidencialidade que garante a segurança das \ninformações que trocaremos com eles. Alguma dúvida?',
      'Ótimo, quero que vá à sala do meu escriba e envie uma solicitação de \nproposta para alguns fornecedores. Peço que escolha as perguntas mais \npertinentes para que possamos entender os valores de suas empresas.  \nNão se esqueça do acordo de confidencialidade.',
    ],
    dialogo_cena_escriba: [ //dialogo etapa 1
      'Olá Tyler.',
      'Reuni alguns documentos com perguntas \nque usamos em solicitações anteriores. \nAlgumas são muito antigas e não condizem \nmais com os principios do reino.',
      'Escoha àquelas que considerar mais \ninteressantes de serem enviadas aos \nfornecedores.',
      'Quando escolher as 4 perguntas que comporão \no RFP, confime suas escohas.',
      'Quando terminar de escolher volte a falar\ comigo.',
      'Estarei aqui caso precise de ajuda.',
      
    ],
    dialogo_minigame3: [
      'Sejam todos bem-vindos! Começaremos a nossa \nsessão de negociações.', //0
      'Este é Tyler, e ele irá mediar nossa discussão.', //1
      'Todos estão cientes dos nossos prazo. Mas \ngostararia de confirmar, todos conseguirão entregar\nos serviços dentro do combinado?', //2
      'Sim!', //3
      'Ótimo, também preciso informar que nossos \npagamentos serão feitos 30 dias após o serviço, \nexiste algum problema quanto a isso?', //4
      'Nenhum', //5
      'então vamos começar a tratar de valores \npelos serviços...', //6
      'Gizmo, qual a sua proposta?', //7
      '25 mil', //8
      ' ', //9
      'Ótimo', //10
      'que tal 20 mil', //11
      'Por mim está bom.', //12
      'ótimo!...', //13
      'Aysla, qual a sua proposta?', //14
      '10 mil', //15
      ' ', //16
      'Ótimo', //17
      'que tal 7 mil', //18
      'Hum... Podemos fazer por 9 mil?', //19
      ' ', //20
      'Perfeito', //21
      'Que tal 8 mil?', //22
      'Não fecho por menos de 9 mil', //23
      ' ', //24
      'Ok, 9 mil então', //25
      'Só podemos pagar 8', //26
      'Ok, mas esse será meu último trabalho\n para o reino!', //27
      'Ok', //28
      'Perfeito!', //29
      'Mago, qual a sua proposta?', //30
      '10 mil', //31
      ' ', //32
      'Perfeito', //33
      'que tal 8 mil', //34
      'Combinado!', //35
      'Perfeito', //36
      'Elfa, qual a sua proposta?', //37
      '6 mil', //38
      '', //39
      'Perfeito', //40
      'que tal 4 mil', //41
      'não posso, preciso de pelo menos 6 mil.', //42
      ' ', //43
      'ok', //44
      'Só podemos pagar é 4 mil.', //45
      'Por menos que 6 eu não faço', //46
      ' ', //47
      'Ok', //48
      'Esse valor está perfeitamente justo, Tyler.', //49
      ' ', //50
      'ok, combinado', //51
      'Com os últimos detalhes ajustados, peço \nque vão a sala de minha escriba para \nassinar os contratos!' //52
    ],

    dialogo_cena_escriba2:[ //dialogo etapa 1
      'Você foi muito rápido, Tyler, parabéns!',
      'Acredito que você conseguiu concluir o \ndocumento com maestria, agora leve-o para o \nRei para que ele diga o que você deve fazer \na seguir.',

    ],
    dialogo_cena_castelo2: [ //dialogo etapa 1
      'Obrigado, Tyler! Pedirei que sejam feitas cópias desta carta \ne as enviarei para as empresas da região. Também enviarei uma \ndescrição detalhada de tudo que precisamos para o evento.  Em breve \nteremos respostas, venha amanhã para analisar o que obtivermos.',
    ],
//depois dessa dialogo td fica preto (a tela) para mostar que a passagem de tempo.
    dialogo_cena_castelo3:[ //dialogo etapa 1
      'Olá, Tyler, tenho ótimas notícias! Recebemos diversas respostas \nde empresas das terras próximas.',
      'Contudo, muitos deles não estão de acordo de confidencialidade, com a \nnossa proposta ou não estão alinhados aos interesses e valores do \nnosso reino.',
      'Por isso, veja as respostas que recebemos e selecione àquelas mais \napropriadas para a contratação. As respostas lhe esperam na sala \ndo escriba.',
      ],

    dialogo_cena_escriba3:[ //dialogo etapa 1
      'Olá, Tyler! Imagino que o rei já tenha lhe \navisado, mas recebemos várias respostas. \n7 respostas, para sermos mais precisos.',
      'Bom, essa pilha de fichas não vão se analisar \nsozinhas, então é bom começar.',
      'Leia todas as fichas e escolha aquelas que \natendam os valores do reino.',
      'Quando terminar de escolher volte a falar\ comigo.',
      'Estarei aqui caso precisa de ajuda.',

    ],

    dialogo_cena_escriba4: [ //dialogo etapa 1
      'Uau, continua supreendendo, Tyler.',
      'Tenho certeza de que você fez escolhas \nexcelentes! Agora se apresse e leve as fichas \nescolhidas para que o Rei possa analisá-las',

    ],

    dialogo_cena_castelo4:[ //dialogo etapa 1
      'Olá, Tyler, vejo que já escolheu algumas das fichas dos fornecedores!', 'Irei analisar cuidadosamente os perfis de empresa que você escolheu. \nFarei essa revisão juntamente aos meus conselheiros, isso tudo \npara que possamos evitar vieses e manter certa imparcialidade',
      'Volte amanhã, já terei uma resposta e poderemos seguir para a próxima \netapa!',
      
    ],
//depois desse dialogo vai aparecer na tela o resumo da etapa 1 
    dialogo_cena_castelo5:[ //dialogo etapa 2
      
      
    ],
    //tela preta para mostrar passagem de tempo

    dialogo_cena_castelo6:[ //dialogo etapa 2
      'Que bom vê-lo de volta! Concluí minha revisão. Meus conselheiros \ntambém fizeram as suas e tudo está nos conformes! Todos \nserão cadastrados no sistema interno do reino.',
      'Também entrarei em contato com a equipe responsável pelos contratos \ndo castelo. Quando eles estiverem prontos enviarei aos fornecedores.',
      'Pedirei que venham ao castelo para que possamos discutir alguns pontos \nmais específicos da prestação de serviços. Lhe avisarei quando eles \nvierem, então você poderá me ajudar no momento das negociações!',
      'Te vejo em breve',

    ],
    //tela com o resumo da etapa 2 

    dialogo_cena_castelo7:[ //dialogo etapa 3
      'Olá, Tyler. Os nossos fornecedores chegarão muito em breve, mas antes \ngostaria de realizar um breve alianhamento sobre o que faremos.',
      'Iremos tratar de aspectos específicos do contrato, como o prazo de entrega \ndo serviço, prazo de pagamento e negociar um preço justo pelos \ntrabalhos. Lembre-se que toda negociação é sobre saber moderar entre \nser firme e ceder.',
      'Acredito que você fará um ótimo trabalho. Aguarde aqui até \nque nossos fornecedores cheguem ao castelo.',
    ],//talvez colocar dialogo da etapa 3, a continuação da negociação

    dialogo_cena_castelo8:[ //dialogo etapa 4
      'Parabéns, Tyler! Você escolheu bem nossos fornecedores, \nos contratos já estão assinados e a ordem de compra foi emitida!',
      'O evento será um sucesso!',
    ],
    //Tela escurece e volta com os fornecedores na sala do trono
    
     //resumo da etapa 3


    dialogo_cena_castelo9:[ //dialogo etapa 4
      'Tyler, recebemos atualizações dos nossos fornecedores. A preparação \npara do evento corre a todo vapor! Quase tudo está finalizado. O \nevento será grandioso!  Lhe espero no dia da festa.',

    ],

    //tela preta - cena da festa - explicação etapa 4

   
    dialogo_cena_castelo10:[ //etapa 6/7
      'O evento foi maravilhosa, Tyler! Já encaminhei o ordem de pagamento \nà equipe responsável do castelo.',
      'Muito obrigado por todo o apoio que você nos deu durante todo esse \nprocesso, Tyler.',
      'Espero que tenha ficado tudo claro. Até a próxima!!',

    ],

    //tela em preto, volta para o escritorio
    dialogo_cena_escritorio2: [
      'Bem vindo de volta, Tyler.',
      'Bom, a última etapa do processo de contratação é a \nfinalização do contrato.Aqui você decide como vai \nproceder em relação ao fornecedor.',
      'Você pode desejar manter relações com ele para \nserviços futuros e acompanhá-lo, ou pode optar por se \ndesvincular totalmente dele.', 
      'Então, por hoje é só. Espero que você tenha \ngostado',
      'Até amanhã',
    

    ],

    //Todos os textos falando etapa
    texto_etapa1:[ 
      'etapa 1 - sourcing',
    ],


    //Texto para a cena do meta connect
    dialogo_cena_metaConnect_rei:[ 
      'Olá Tyler, gostou da Festa?',
      'Espero que sim, até mais!'
    ],

    dialogo_cena_metaConnect_donoLoja:[ 
      'Gastou de alguma coisa da loja?'
    ],
  },
  //Dialogo em inglês
  en: {
    dialogo_cena_predio: [
      'Hello, welcome to our game!  \nEnter the building on the right to \nhire suppliers! \nTo start enter the building '
    ],
    dialogo_cena_escritorio: [
      'Hello, Tyler, Welcome aboard!',
      'My name is Vanessa, I am from the diversity \nsupplier team.',
      'Today is the big day of your training! Are you ready?',
      'Great! Come with me',
      'Together with the Innovation team \nwe are experimenting with a new training method\nto teach about the supplier hiring process.',
      'This training aims to be immersive, and happens inside \nthe Meta Verse.',
      'To begin, aproach the Meta Quest 3 and enter the Meta Verse!',
      'Are you ready?',
      'Great, see you later!',
    ],
    dialogo_cena_exterior_npc1: [
      "Hello, i'm the owner of the store"
    ],

    dialogo_cena_exterior_npc2: [
      "Hi, i'm the guard of the castle"
    ],

    dialogo_cena_exterior_informacao: [
      'The castle is up ahead!'

    ],

    dialogo_cena_corredor_npc: [
      "You are in the king's castle, \n do your best to help him!"

    ],

    dialogo_cena_corredor_banner: [
      "This seems to be the emblem \n of the kingdom!"

    ],

    texto_boasvindas_castelo:[
      "Welcome to the King's room"
    ],

    dialogo_cena_castelo: [
      'Tyler, you arrived! How wonderful!',
      'I know you might be a bit confused\nso let me explain whats happening...',
      'I need your help. After years of research, the kingdom of Meta\nhas developed a device that can create universes within a helmet. \nWe decided to call it the Meta Quest 3 Pro.',
      'We will announce our creation at an event here in the castle:\nThe Meta Connect',
      'A grand festival with people from various kingdoms. But for this,\nI need help hiring suppliers to provide services during the party...',
      'Can you help us?',
      'Excellent, Tyler! Lets get started, but first...',
      'Its crucial that the suppliers we hire follow our principles. \nWe cannot affiliate with people who have\nhistory of human rights violations. Therefore, \n avoid companies that have been involvedin scandals of this nature \nor do any kinda of unethical actions.',
      'Its also important to consider the diversity of the companies we hire.\nHere we value a plurality of views, \nso also avoid companies that lack diversity',
      'The launch of the Meta Quest 3 Pro is a big deal, \nso we need to ensure no information leaks ahead of time.  \nAsk the suppliers to sign the NDA, a confidentiality agreement \nthat ensures the security  \nof the information we exchange with them. Any question?',
      'Great, I want you to go to my scribes room and send a request \nfor proposals to some suppliers. Please choose the most pertinent questions \nso that we can understand the values of their companies.  \nDo not forget the confidentiality agreement.',
    ],
    dialogo_cena_escriba: [
      'Hello, Tyler. I have gathered some documents\n with questions we have used in previous\nrequests. Some are very old and no longer\nalign with the kingdom principles',
      'Choose those that you find most interesting\n  to send to the suppliers. When you have chosen\n the 4 questions that will make up \nthe RFP, confirm your choices.',
      'I will be here if you need any help.',
    ],
    dialogo_minigame3: [
      '"Welcome everyone! We will beggin \nour negotiation session.', //0
      'This is Tyler, and he will mediate our discussion.', //1
      'Everyone is aware of our deadline. But \n I would like to confirm, can everyone deliver\n the services within the agreed time?', //2
      'Yes!', //3
      'Great, I also need to inform you that our \npayments will be made 30 days after the service, \nis there any problem with that?', //4
      'None', //5
      'Then let us start discussing the values \n for the services...', //6
      'Gizmo, what is your proposal?', //7
      '25 thousand', //8
      ' ', //9
      'Great', //10
      'how about 20 thousand', //11
      'Thats fine with me.', //12
      'Great!...', //13
      'Aysla, what is your proposal?', //14
      '10 thousand', //15
      ' ', //16
      'Great', //17
      'How about 7 thousand', //18
      'Hum...Can we do it for 9 thousand?', //19
      ' ', //20
      'Perfect', //21
      'How about 8 thousand?', //22
      'I wont close for less than 9 thousand', //23
      ' ', //24
      'Ok, 9 thousand then', //25
      'We can only pay 8', //26
      'Okay, but this will be my last job\n for the kingdom!', //27
      'Ok', //28
      'Perfect!', //29
      'Wizard, what is your proposal?', //30
      '10 thousand', //31
      ' ', //32
      'Perfect', //33
      'How about 8 thousand', //34
      'Deal!', //35
      'Perfect', //36
      'Elf, what is your proposal?', //37
      '6 thousand', //38
      '', //39
      'Perfeito', //40
      'how about 4 mil', //41
      'I cant, We need at least 6 thousand.', //42
      ' ', //43
      'ok', //44
      'We can only pay 4 thousand.', //45
      'We wont do it for less than 6', //46
      ' ', //47
      'Ok', //48
      'This amount is perfectly fair, Tyler.', //49
      ' ', //50
      'ok, agreed', //51
      'With the last details adjusted, please \ngo to my scribe room \nto sign the contracts!' //52
    ],
    dialogo_cena_escriba2:[ //dialogo etapa 1
      'You were very quick Tyler, congratulations',
      'I belive you were able to conclude\nthe documents with mastery, now take them to the\nKing, so that he can tell you whart you should do\nnext.',

    ],
    dialogo_cena_castelo2: [
      'Thank you, Tyler! I will have copies of this letter made \nand send them to companies in the region. I will also send \na detailed description of everything we need for the event.  We will soon \nhave responses, come tomorrow to analyze what we get.'

    ],
    dialogo_cena_castelo3:[ //dialogo etapa 1
      'Hello, Tyler, I have great news! We have received several responses \nfrom companies in the nearby lands.',
      'However, many of them are not in agreement with our\n confidentiality proposal, or are not aligned with the interests and values  \nof our kingdom.',
      'Therefore, please review the responses we have received and select those \n most appropriate for hiring. The responses await you  \nyou in the scribes room.',
      ],

    dialogo_cena_escriba3:[ //dialogo etapa 1
      'Hello, Tyler!  I imagine the king has already\n informed you, but we have received several responses. \n7 responses, to be more precise.',
      'Well, this pile of cards wont analyze\n themselves, so it is good to start.',
      'Read all the cards and choose those that \nthat meet the values of the kingdom.',
      'When you finish choosing, come back\ to talk with me.',
      '"Ill be here if you need help.',

    ],

    dialogo_cena_escriba4: [ //dialogo etapa 1
      'Wow, you continue to surprise, Tyler.',
      'I am sure you made excellent choices! \nNow hurry and take the chosen cards \nso that the King can analyze them',

    ],

    dialogo_cena_castelo4:[ //dialogo etapa 1
      'Hello, Tyler, I see you have already chosen some of the supplier cards!', 'I will carefully analyze the company profiles you have chosen. \n I will do this review together with my advisors, all this \nto avoid biases and maintain some impartiality',
      'Come back tomorrow, I will have an answer \nand we can move on to the next step!',
      
    ],
    //depois desse dialogo vai aparecer na tela o resumo da etapa 1 
    dialogo_cena_castelo5:[ //dialogo etapa 2
      
      
    ],
    dialogo_cena_castelo6:[ //dialogo etapa 2
      'Glad to see you back! I have completed my review. My advisors \n have also done theirs and everything is in order! Everyone \n will be registered in the internal system of the kingdom.',
      'I will also contact the castle contract team \n When they are ready, I will send them to the suppliers.',
      'I will ask them to come to the castle so that we can discuss some more   \nspecific points os the service given. I will warn you \n whe  they come, so you can helo me with the negotiations!',
      'See you soon',

  ],
  //tela com o resumo da etapa 2 

  dialogo_cena_castelo7:[ //dialogo etapa 3
      'Hello, Tyler. Our suppliers will arrive very soon, but first, \n I would like to make a brief alignment about what we will do.',
      'We will deal with specific aspects of the contract, such as the service \ndelivery deadline, payment deadline, and negotiate \na fair price for the works.trabalhos.Remember that every negotiation is about knowing \nhow to moderate between being firm and giving in.',
      'I believe you will do a great job. Wait here until \nour suppliers arrive at the castle.',
  ],//talvez colocar dialogo da etapa 3, a continuação da negociação

  //Tela escurece e volta com os fornecedores na sala do trono
  
   //resumo da etapa 3

  dialogo_cena_castelo8:[ //dialogo etapa 4
      'Tyler, we have updates from our suppliers. The preparation \nfor the event is in full swing!  Almost everything is finalized. The \neThe event will be grand! I will wait for you on the day of the party.',

  ],

  //tela preta - cena da festa - explicação etapa 4

 
  dialogo_cena_castelo9:[ //etapa 6/7
      'The event was wonderful, Tyler! I have already sent the payment order \n to the castles responsible team.',
      'Thank you very much for all the support you gave us during \nthis whole process, Tyler',
      'I hope everything was clear. See you next time!!',

  ],

  //tela em preto, volta para o escritorio
  dialogo_cena_escritorio2: [
      'Welcome back, Tyler.',
      'What happened? Is this the  \nwhole hiring process?' ,
      'Well, the last step in the hiring process is the\nfinalization of the contract. Here you decide how to \nproceed concerning the supplier.',
      'You may wish to maintain relations with him  \nfor future services and follow up, or you may opt to completely \n disassociate from him.', 
      'So, that is all for today,  what did you  \nthink of the training?',
      '',
      'Ha ha, you will soon get used to it. \nSee you tomorrow!.',
      '',

  ],


    //Todos os textos falando etapa
    texto_etapa1:[ 
      'step 1 - sourcing',
    ],
  },
};

export default dialogs;
