# Hello World

### 1. Luo komponentti
Luo yksinkertainen React-komponentti, joka näyttää tervehdysviestin. Tämä tehtävä auttaa sinua harjoittelemaan komponenttien luomista, JSX:n käyttöä ja props:ien välittämistä.

Luo React-projektiisi uusi tiedosto nimeltä `Greeting.tsx`. Määritä tähän tiedostoon uusi React-komponentti nimeltä `Greeting`.

Tämän komponentin tulee palauttaa seuraava HTML:
```
<h3>Hello World!</h3>
```
#### Käytä Greeting-komponenttia App.tsx:ssä
Avaa `App.tsx`-tiedosto ja tuo `Greeting`-komponentti `App` komponenttin.

Käytä `Greeting`-komponenttia `App`-komponentin `return`-lauseessa, jotta Hello World! -viesti näkyy verkkosivulla.

### 2. Props

Välitä nimi props:in (`name`) avulla `App` komponentista `Greeting`-komponentille. Päivitä `Greeting`-komponentti ottamaan vastaan props:it.

Näytä "Hello {name}!" sen sijaan, että näytetään "Hello world!".

Esimerkiksi, jos välität nimeksi Alex, komponentti näyttää "Hello Alex!".

> [!IMPORTANT]
> Kaikki Github Classroom -tehtävät tällä kurssilla sisältävät GitHub-workflown, joka tarkistaa koodisi automaattisesti linterin avulla. Täyden pistemäärän saadaksesi workflow’n tulee mennä läpi ilman virheitä.
> Ennen kuin palautat tehtävän, voit ajaa linterin paikallisesti tietokoneellasi seuraavalla komennolla:
> ```
> npm run lint
> ```
