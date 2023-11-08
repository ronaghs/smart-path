# SmartPath

Website link:
[SmartPath](https://654bfc206e1db14ba89bc482--precious-fox-3394d9.netlify.app/)

## SmartPath serves as a meetup coordination platform. Utilizing the Google Maps API, users can enter multiple individuals' addresses and find an average point in between all parties to then meetup. Additionally, with the use of the Google Places API, SmartPath will provide various meetup locations such as restaurants, bars, and cafes.

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Technologies](#technologies)
- [Issues](#issues)

### Description

Occasionally, large parties of individuals from varying locations need to meet up, whether they are friends, family, or acquaintances. Coordinating a fair meetup location can be challenging when parties are spread across different areas. SmartPath aims to simplify this process.

Users input the addresses of their friends, and SmartPath stores these addresses as geographic coordinates. Once the addresses are entered, SmartPath calculates an average geographical coordinate, which is represented as a pin on the map. This pin represents the most equitable meetup location, being the average distance from all parties involved. Additionally, users can specify a radius to find various establishments near the calculated pin, offering suggestions for potential meetup spots.

### Usage

Video demonstration:

[![Video Demo](https://img.youtube.com/vi/x7M18tMKgYs/0.jpg)](https://youtu.be/x7M18tMKgYs)

### Technologies

- React
- Google Maps API
- Google Places API
- Material UI
- Framer Motion
- Vanta.js
- Slick Carousel

### Known bugs

#### To-do bugs to fix:

-Clearing the address field does not clear the stored geographical coordinates for that address. This invalidates the "SmartPath" calculation.
