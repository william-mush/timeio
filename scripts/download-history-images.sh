#!/bin/bash

# Create the images directory if it doesn't exist
mkdir -p public/images/history

# Download images
curl -o public/images/history/sundial.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sundial_in_St._Peter%27s_Square.jpg/800px-Sundial_in_St._Peter%27s_Square.jpg"
curl -o public/images/history/water-clock.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Clepsydra.jpg/800px-Clepsydra.jpg"
curl -o public/images/history/candle-clock.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Candle_clock.jpg/800px-Candle_clock.jpg"
curl -o public/images/history/incense-clock.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Incense_clock.jpg/800px-Incense_clock.jpg"
curl -o public/images/history/mechanical-clock.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Strasbourg_clock.jpg/800px-Strasbourg_clock.jpg"
curl -o public/images/history/pendulum-clock.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Pendulum_clock.jpg/800px-Pendulum_clock.jpg"
curl -o public/images/history/pocket-watch.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pocket_watch.jpg/800px-Pocket_watch.jpg"
curl -o public/images/history/atomic-clock.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/NIST-F1_Atomic_Clock.jpg/800px-NIST-F1_Atomic_Clock.jpg"
curl -o public/images/history/time-zones.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/World_Time_Zones_Map.png/800px-World_Time_Zones_Map.png"
curl -o public/images/history/digital-clock.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Digital_clock.jpg/800px-Digital_clock.jpg" 