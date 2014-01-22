Appunti su Git, Node.js, D3.js e Angular.js
===========================================

- [Git](#git)
- [Node.js](#nodejs)
- [D3.js](#d3js)
- [Angular.js](#angularjs)

## GIT
- Git in generale:
  - [gittutorial(7) Manual Page](https://www.kernel.org/pub/software/scm/git/docs/gittutorial.html): utile per
    avere un recap dei comandi principali e delle attivita' principali
  - [Git Flow: A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/): posto
    che su github sembra molto piu' conveniente usare master come branch di default, e' molto interessante la
    la sezione la sezione "Supporting branches", perche' ricapitola i comandi principali per gestire in modo
    efficace lo sviluppo (e il merge) su branch multipli
- GitHub:
  - [try.github.io](http://try.github.io): crash course di 15 minuti per
    impratichirsi con git
  - [Markdown](http://en.wikipedia.org/wiki/Markdown): uno dei linguaggi di
    markup automaticamente supportati da GitHub (per esempio, questo file
    e' scritto usando markdown)

## Node.js
Cenni di programmazione:
 - [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
   - [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
 - [The C10K problem](http://en.wikipedia.org/wiki/C10k_problem)
 - Lisp: [Structure and Interpretation of Computer Programs (SICP)](http://mitpress.mit.edu/books/structure-and-interpretation-computer-programs)
 - [Node.js API](http://nodejs.org/api/)
   - [Async DNS request](https://github.com/alferx/gitnod3/blob/master/nodejs/dns.js)
   - [Async HTTP server](https://github.com/alferx/gitnod3/blob/master/nodejs/http.js)
   - [Execute an external command](https://github.com/alferx/gitnod3/blob/master/nodejs/execute.js)
   - [Async IPC](https://github.com/alferx/gitnod3/blob/master/nodejs/parent.js)


## D3.js
- http://d3js.org
- http://bost.ocks.org/mike/selection/

## Angular.js

- Concetti correlati

  - [REST](http://en.wikipedia.org/wiki/Representational_state_transfer)

  - [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete)

- Carrellata iniziale

  - Model-View-Controller lato client, in Javascript

  - Gestione del routing, perche' non devi piu' richiedere
    pagine diverse al server

  - Di solito ogni vista ha il suo controllore

  - Provider, factory, service

  - Come passare da una applicazione locale e standalone a una
    applicazione che parla con Node.js

  - Twitter bootstrap

- Organizzazione single page applications

  - Spostiamo una parte del modello dal client al server

  - Dal server al browser arriva la vista (un template), sta
    poi al browser popolare la vista usando i dati, che il
    client chiede al server usando REST

  - Cose che rimangono sul server

    - AA(A): authorization, authentication(, accounting)

    - validazione dei dati

    - passaggio di token dal server al client

    - persistenza dei dati su "database"

  - Una volta caricata, l'applicazione intercetta le richieste
    dell'utente e interagisce col server per:

    - ottenere nuovi template

    - scaricare dei dati usando REST

- Problemi/soluzioni delle single page application

  - gestire richieste asincrone

  - fare funzionare forward/backward

    - moralmente e' una richiesta dell'utente di cambiare stato

    - si risolve usando il routing

    - le uri (tipo /#/foobar) sono mappate sugli stati

- Architettura

  - c'e' un HTML container con dentro le viste

  - il meccanismo di routing invoca le viste che
    contengono template, modello e controllore

  - il controllore comunica col server via XHR

  - MV* perche' ci sono leggere modifiche rispetto
    al pattern MVC

- Angular e' un Model View View-Model

  - tra la vista e il modello c'e' un componente,
    il View-Model, che e' una specie di controllore
    semplice che si occupa di preparare i dati per
    la vista chiedendoli al modello

  - in angular la vista viene arricchita con una
    cosa chiamata 'data binding'

  - il view-model e la vista comunicano tra di
    loro usando il data binding

    - se i dati vengono modificati nella vista,
      allora vengono aggiornati nel modello (dal
      framework)

    - se i dati vengono modificati lato server,
      la vista viene aggiornata dal framework

- Esempio app1.html: two-way data binding

- Filtri

- Esempio del SimpleController

- rootScope

- Rispetto ad una callback ajax, qua devo usare
  parametri col nome giusto (come `$scope`)
  nella definizione della funzione controller

- Hands-on
