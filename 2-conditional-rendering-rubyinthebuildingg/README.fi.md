
# Ehdollinen renderöinti
Käytä propseja ja tilaa (state) komponenttien ehdolliseen renderöintiin annetun boolean arvon perusteella.

### 1. Luo ProfileCard komponentti
Luo React komponentti nimeltä `ProfileCard`.

Komponentti vastaanottaa seuraavat props:it:
```
name: string
age: number
showDetails: boolean
```
Komponentin toiminta:
- Komponentti näyttää aina `name` props:in arvon
- `age` props:in arvo näytetään vain jos `showDetails` arvo on `true`.

### 2. Display ProfileCard comp
`App` komponentti näyttää kaksi `ProfileCard` komponenttia:
- Yksi missä `showDetails` arvo on `true`.
- Yksi missä `showDetails` arvo on `false`.

**Esimerkki tulostus:**

![Conditional render](./src/assets/conditional_render.png)
