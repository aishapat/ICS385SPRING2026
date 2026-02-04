/*
week 4 hero homework
This code shows a hero, villain, quotes, and saves them to text files.
*/

// Import Node packages
const fs = require('fs'); // to write files
const popularMovieQuotes = require('popular-movie-quotes'); // for movie quotes
const famousLastWords = require('famous-last-words'); // for last words

// Set hero, villain, and inspiration quote
const hero = "Superman";
const villain = "The Joker";
const inspirationQuote = "You can be anything you want to be if you set your mind to it";

// Get random quotes from the packages
const movieQuote = popularMovieQuotes.getRandomQuote(); 
const lastWords = famousLastWords[Math.floor(Math.random() * famousLastWords.length)];


// Save each item to its own text file
fs.writeFileSync('hero.txt', hero);
fs.writeFileSync('villain.txt', villain);
fs.writeFileSync('inspiration-quote.txt', inspirationQuote);
fs.writeFileSync('popular-movie-quote.txt', movieQuote);
fs.writeFileSync('famous-last-words.txt', lastWords);

