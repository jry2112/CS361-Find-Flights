# Find Flights Travel App

## Introduction

Cheap travel planning app that recommends upcoming flights based on a desired flight origin. The application uses the [Amadeaus Flight Offers Search]([url](https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search)) to identify the 3 cheapest upcoming flights from the provided origin. Once potential destinations are determined, the application provides users with a map showing the travel destination and images inspired by the destination.

## Design and Usage

This project required utilizing the Agile development process to design and implement a product using Microservices Architecture. The project consists of multiple independent Microservices that interact with the larger project:
1. Image Generator
2. Latitude Longitude Service

The Image Generator Microservice uses the Unsplash API to return a list of images URLs based on the provided keyword(s). The Latitude Longitude Service was designed by a classmate, and interacts with the Google Maps API to retrive latitude longitude data based on a given location name.  
Find Flights then uses the return results to generate a page showing a map and images based on the destination. 

## Demo Video
Click to play  
[![Find Flights Demo](https://img.youtube.com/vi/FLHcZQIj5as/0.jpg)]([https://www.youtube.com/watch?v=YouTube_video_ID](https://youtu.be/FLHcZQIj5as))
