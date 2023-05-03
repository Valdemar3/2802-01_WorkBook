import { faker } from '@faker-js/faker'
import tags from '../fixtures/tags.json'
import articles from '../fixtures/articles.json'

tags.tags[0] = faker.animal.bird()
tags.tags[1] = faker.animal.bird()
tags.tags[2] = faker.animal.bird()

let article = articles.articles[0];

article.title = faker.music.genre()
article.description = faker.music.songName()
article.body = faker.music.songName()

articles.articles[2] = article;
articles.articlesCount = 3;

it('Tags should display on home page', () => {
    cy.log('Prepare intercept command for tags list')
    cy.intercept('GET', '**/tags', tags)

    cy.log('Open home page')
    cy.visit('localhost:3000')

    cy.log('Log in user')
    cy.get('a[href="/user/login"]').click();
    cy.get('[placeholder="Email"]').type('qweqwe@qwe.com');
    cy.get('[placeholder="Password"]').type('123qweqwe');
    cy.get('button[type="submit"]').click();

    cy.log('Verify fake tags on page')
    for(let i = 0; i < tags.tags.length; i++){
        cy.get('a.tag-pill').should('contain', tags.tags[i]);
    }

})

it('Fake articles', () => {
    cy.log('Prepare intercept command for tags list')
    cy.intercept('GET', '**/articles?limit=10&offset=0', articles)

    cy.log('Open home page')
    cy.visit('localhost:3000')

    cy.log('Log in user')
    cy.get('a[href="/user/login"]').click();
    cy.get('[placeholder="Email"]').type('qweqwe@qwe.com');
    cy.get('[placeholder="Password"]').type('123qweqwe');
    cy.get('button[type="submit"]').click();

    cy.contains('li.nav-item', 'Global Feed').click();

    for(let i = 0; i < articles.articles.length; i++){
        cy.contains('.preview-link', articles.articles[i].description)
        .should('contain', articles.articles[i].description)
        .and('contain', articles.articles[i].title);
    }

})