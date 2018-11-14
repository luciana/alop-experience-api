/**
 Provide Api for Home

    User model - returns observables

**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable;
//const ALL_SCHEDULES  = '[{"schedule_id": 1,"id": 597,"title": "Beg/Int Core Quickie","duration_id": 1,"duration": "10-20 min","concentration": "Core"},{"schedule_id": 1,"id": 559,"title": "Abs Abs Abs!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 1,"id": 663,"title": "Stretch Your Spine","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 1,"id": 685,"title": "Legs and Core Focus","duration_id": 3,"duration": "50-60 min","concentrations_id": "[36","concentration": "Core, Lower Body"},{"schedule_id": 2,"id": 680,"title": "Arms in 10","duration_id": 1,"duration": "10-20 min","concentrations_id": "[34]","concentration": "Lower Body"},{"schedule_id": 2,"id": 668,"title": "Upper Body Focus Under 30","duration_id": 2,"duration": "30-40 min","concentrations_id": "[34]","concentration": "Lower Body"},{"schedule_id": 2,"id": 642,"title": "Use your arms!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"},{"schedule_id": 2,"id": 495,"title": "Effort and Ease","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 26,"id": 544,"title": "Pilates Upper Body focus","duration_id": 3,"duration": "50-60 min","concentrations_id": "[34]","concentration": "Lower Body"},{"schedule_id": 3,"id": 525,"title": "Quick Lower Body Focus","duration_id": 2,"duration": "30-40 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 3,"id": 696,"title": "Climb Mountains","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"},{"schedule_id": 3,"id": 670,"title": "Legs in 50 or Less","duration_id": 3,"duration": "50-60 min","concentrations_id": "[35]","concentration": "Lower Body"},{"schedule_id": 3,"id": 479,"title": "Flow With Ease","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 26,"id": 479,"title": "Flow With Ease","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 25,"id": 479,"title": "Flow With Ease","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 4,"id": 649,"title": "Ease Into It","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 4,"id": 704,"title": "Beginner Love","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 4,"id": 485,"title": "Full Pilates in 30","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 4,"id": 664,"title": "Basics 101","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 5,"id": 638,"title": "Keep it simple and move","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"},{"schedule_id": 5,"id": 586,"title": "Pilates Mat","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"},{"schedule_id": 5,"id": 555,"title": "Beginner Abs Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 5,"id": 557,"title": "Classic Pilates Hour","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 6,"id": 651,"title": "Love Legs","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 26,"id": 651,"title": "Love Legs","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 6,"id": 682,"title": "Pilates in 20 Steps","duration_id": 2,"duration": "30-40 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 6,"id": 589,"title": "Legs Core-Beg./Int.","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"},{"schedule_id": 6,"id": 700,"title": "Stretch it Out + Legs","duration_id": 3,"duration": "50-60 min","concentrations_id": "[36","concentration": "Core, Lower Body"},{"schedule_id": 25,"id": 700,"title": "Stretch it Out + Legs","duration_id": 3,"duration": "50-60 min","concentrations_id": "[36","concentration": "Core, Lower Body"},{"schedule_id": 7,"id": 654,"title": "Simple and Effective","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 7,"id": 562,"title": "Advanced with no time to waste","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 7,"id": 699,"title": "Core + Stretch","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 7,"id": 671,"title": "Full Body Focus in 60 or Less","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 8,"id": 526,"title": "Quick Stretch","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 8,"id": 693,"title": "Pilates with stretching","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37","concentration": "Core, Full Body"},{"schedule_id": 8,"id": 662,"title": "Evening De-stresser","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 8,"id": 692,"title": "Taking it a little easy Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 9,"id": 688,"title": "Plank It Out","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"},{"schedule_id": 9,"id": 590,"title": "Core/Arms","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"},{"schedule_id": 26,"id": 590,"title": "Core/Arms","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"},{"schedule_id": 9,"id": 584,"title": "Power Pilates in 30 minutes","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 9,"id": 538,"title": "Classical-ish workout","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 10,"id": 686,"title": "Side Line Series","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"},{"schedule_id": 10,"id": 639,"title": "Lengthen your Limbs!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Full Body"},{"schedule_id": 10,"id": 568,"title": "Boot camp training","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 10,"id": 569,"title": "Fun and Energizing!","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 11,"id": 517,"title": "Quick Energy","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"},{"schedule_id": 11,"id": 669,"title": "Core Power in 35 or Less","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 11,"id": 483,"title": "Mat Connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 11,"id": 581,"title": "Quick Power","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 12,"id": 656,"title": "Stretch and Lengthen","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 12,"id": 684,"title": "Teaser of Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 12,"id": 594,"title": "Trunk Strength","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 12,"id": 702,"title": "Work it Stretch it","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 13,"id": 523,"title": "Intermediate Flow in 15","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 13,"id": 606,"title": "Beg./Int. Quick Core Connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 13,"id": 578,"title": "Pilates Fun for Everyone","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 13,"id": 592,"title": "Bring it!","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 14,"id": 522,"title": "Pilates in 10min for Beginners","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 14,"id": 579,"title": "Energy for Full Body","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 14,"id": 577,"title": "Go With the Flow","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 14,"id": 494,"title": "Wake Up With Basics","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 14,"id": 497,"title": "Full Flow","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 15,"id": 481,"title": "Power in 10","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 15,"id": 516,"title": "Can-Can Basics","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 15,"id": 694,"title": "Weekend Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 15,"id": 598,"title": "Keep Moving","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 16,"id": 519,"title": "Power Core","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 16,"id": 596,"title": "Core arm connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"},{"schedule_id": 16,"id": 588,"title": "Quick cross train core","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 16,"id": 661,"title": "Energize Your Afternoon","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 17,"id": 533,"title": "Lunchtime Pilates in 40 min. or less!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 17,"id": 640,"title": "Move Quickly","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 17,"id": 567,"title": "Strong and Safe","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 17,"id": 679,"title": "Yin and Yang of Pilates","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 18,"id": 530,"title": "Basic Beginner Pilates Class","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 18,"id": 542,"title": "Focus on abdominals","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 18,"id": 496,"title": "Pilates Anytime","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 18,"id": 585,"title": "High Energy","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 19,"id": 681,"title": "Short Stretch","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 19,"id": 521,"title": "Mat Flow Under 30","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 19,"id": 695,"title": "Take it easy boot camp","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 19,"id": 689,"title": "Just Flow","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 20,"id": 524,"title": "Stretch and Breathe","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 20,"id": 477,"title": "Energized and De-Stressed","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 20,"id": 576,"title": "Feeling Good Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 20,"id": 558,"title": "Pilates Full hour","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 21,"id": 582,"title": "Energy Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 21,"id": 624,"title": "Lunch Break","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 21,"id": 565,"title": "Mat Class","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 21,"id": 465,"title": "Power Up","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 22,"id": 701,"title": "Cool Down in Just Minutes","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 22,"id": 646,"title": "Full Body Empowerment","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 22,"id": 518,"title": "Precision and Power","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 22,"id": 561,"title": "Classic Full Body with Preps","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 23,"id": 599,"title": "Sports Fitness","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"},{"schedule_id": 23,"id": 672,"title": "Full Body Focus","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 23,"id": 607,"title": "Serious Business","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 23,"id": 660,"title": "Power Up Your Morning","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 24,"id": 643,"title": "Leg bones connect to the hip bone","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"},{"schedule_id": 24,"id": 595,"title": "The leg connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"},{"schedule_id": 24,"id": 575,"title": "Pilates Full Body Action","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 25,"id": 543,"title": "Full body with low body focus","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37","concentration": "Core, Full Body"},{"schedule_id": 25,"id": 678,"title": "Tight Core","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 24,"id": 622,"title": "Move Fast","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36, 37","concentration": "Full Body with Lower focus"}]';
const ALL_SCHEDULES  = '[{"schedule_id": 1,"id": 597,"title": "Beg/Int Core Quickie","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"},{"schedule_id": 1,"id": 530,"title": "Basic Beginner Pilates Class","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Core"},{"schedule_id": 1,"id": 681,"title": "Short Stretch","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 1,"id": 559,"title": "Abs Abs Abs!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 1,"id": 663,"title": "Stretch Your Spine","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 2,"id": 680,"title": "Arms in 10","duration_id": 1,"duration": "10-20 min","concentrations_id": "[34]","concentration": "Lower Body"}, {"schedule_id": 2,"id": 701,"title": "Cool Down in Just Minutes","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"},{"schedule_id": 2,"id": 668,"title": "Upper Body Focus Under 30","duration_id": 2,"duration": "30-40 min","concentrations_id": "[34]","concentration": "Lower Body"}, {"schedule_id": 2,"id": 642,"title": "Use your arms!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"}, {"schedule_id": 2,"id": 495,"title": "Effort and Ease","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 26,"id": 544,"title": "Pilates Upper Body focus","duration_id": 3,"duration": "50-60 min","concentrations_id": "[34]","concentration": "Lower Body"}, {"schedule_id": 3,"id": 525,"title": "Quick Lower Body Focus","duration_id": 2,"duration": "30-40 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 3,"id": 696,"title": "Climb Mountains","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"}, {"schedule_id": 3,"id": 670,"title": "Legs in 50 or Less","duration_id": 3,"duration": "50-60 min","concentrations_id": "[35]","concentration": "Lower Body"}, {"schedule_id": 3,"id": 479,"title": "Flow With Ease","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 26,"id": 479,"title": "Flow With Ease","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 25,"id": 479,"title": "Flow With Ease","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 4,"id": 649,"title": "Ease Into It","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 4,"id": 704,"title": "Beginner Love","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 4,"id": 485,"title": "Full Pilates in 30","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 4,"id": 664,"title": "Basics 101","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 5,"id": 638,"title": "Keep it simple and move","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"}, {"schedule_id": 5,"id": 586,"title": "Pilates Mat","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"}, {"schedule_id": 5,"id": 555,"title": "Beginner Abs Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 5,"id": 557,"title": "Classic Pilates Hour","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 6,"id": 651,"title": "Love Legs","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 26,"id": 651,"title": "Love Legs","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 6,"id": 682,"title": "Pilates in 20 Steps","duration_id": 2,"duration": "30-40 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 6,"id": 589,"title": "Legs Core-Beg./Int.","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"}, {"schedule_id": 6,"id": 700,"title": "Stretch it Out + Legs","duration_id": 3,"duration": "50-60 min","concentrations_id": "[36","concentration": "Core, Lower Body"}, {"schedule_id": 25,"id": 700,"title": "Stretch it Out + Legs","duration_id": 3,"duration": "50-60 min","concentrations_id": "[36","concentration": "Core, Lower Body"}, {"schedule_id": 7,"id": 654,"title": "Simple and Effective","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 7,"id": 562,"title": "Advanced with no time to waste","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 7,"id": 699,"title": "Core + Stretch","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 7,"id": 671,"title": "Full Body Focus in 60 or Less","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 8,"id": 526,"title": "Quick Stretch","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 8,"id": 693,"title": "Pilates with stretching","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37","concentration": "Core, Full Body"}, {"schedule_id": 8,"id": 662,"title": "Evening De-stresser","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 8,"id": 692,"title": "Taking it a little easy Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 9,"id": 688,"title": "Plank It Out","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"}, {"schedule_id": 9,"id": 590,"title": "Core/Arms","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"}, {"schedule_id": 26,"id": 590,"title": "Core/Arms","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"}, {"schedule_id": 9,"id": 584,"title": "Power Pilates in 30 minutes","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 9,"id": 538,"title": "Classical-ish workout","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 10,"id": 686,"title": "Side Line Series","duration_id": 1,"duration": "10-20 min","concentrations_id": "[35]","concentration": "Upper Body"}, {"schedule_id": 10,"id": 639,"title": "Lengthen your Limbs!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Full Body"}, {"schedule_id": 10,"id": 568,"title": "Boot camp training","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 10,"id": 569,"title": "Fun and Energizing!","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 11,"id": 517,"title": "Quick Energy","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"}, {"schedule_id": 11,"id": 669,"title": "Core Power in 35 or Less","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 11,"id": 483,"title": "Mat Connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 11,"id": 581,"title": "Quick Power","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 12,"id": 656,"title": "Stretch and Lengthen","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 12,"id": 684,"title": "Teaser of Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 12,"id": 594,"title": "Trunk Strength","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 12,"id": 702,"title": "Work it Stretch it","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 13,"id": 523,"title": "Intermediate Flow in 15","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 13,"id": 606,"title": "Beg./Int. Quick Core Connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 13,"id": 578,"title": "Pilates Fun for Everyone","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 13,"id": 592,"title": "Bring it!","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 14,"id": 522,"title": "Pilates in 10min for Beginners","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 14,"id": 579,"title": "Energy for Full Body","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 14,"id": 577,"title": "Go With the Flow","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 14,"id": 494,"title": "Wake Up With Basics","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 14,"id": 497,"title": "Full Flow","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 15,"id": 481,"title": "Power in 10","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 15,"id": 516,"title": "Can-Can Basics","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 15,"id": 694,"title": "Weekend Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 15,"id": 598,"title": "Keep Moving","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 16,"id": 519,"title": "Power Core","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 16,"id": 596,"title": "Core arm connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Upper Body"}, {"schedule_id": 16,"id": 588,"title": "Quick cross train core","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 16,"id": 661,"title": "Energize Your Afternoon","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 17,"id": 533,"title": "Lunchtime Pilates in 40 min. or less!","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 17,"id": 640,"title": "Move Quickly","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 17,"id": 567,"title": "Strong and Safe","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 17,"id": 679,"title": "Yin and Yang of Pilates","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 18,"id": 530,"title": "Basic Beginner Pilates Class","duration_id": 1,"duration": "10-20 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 18,"id": 542,"title": "Focus on abdominals","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36]","concentration": "Core"}, {"schedule_id": 18,"id": 496,"title": "Pilates Anytime","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 18,"id": 585,"title": "High Energy","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 19,"id": 681,"title": "Short Stretch","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 19,"id": 521,"title": "Mat Flow Under 30","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 19,"id": 695,"title": "Take it easy boot camp","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 19,"id": 689,"title": "Just Flow","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 20,"id": 524,"title": "Stretch and Breathe","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 20,"id": 477,"title": "Energized and De-Stressed","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 20,"id": 576,"title": "Feeling Good Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 20,"id": 558,"title": "Pilates Full hour","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 21,"id": 582,"title": "Energy Pilates","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 21,"id": 624,"title": "Lunch Break","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 21,"id": 565,"title": "Mat Class","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 21,"id": 465,"title": "Power Up","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 22,"id": 701,"title": "Cool Down in Just Minutes","duration_id": 1,"duration": "10-20 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 22,"id": 646,"title": "Full Body Empowerment","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 22,"id": 518,"title": "Precision and Power","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 22,"id": 561,"title": "Classic Full Body with Preps","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 23,"id": 599,"title": "Sports Fitness","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Full Body with Lower focus"}, {"schedule_id": 23,"id": 672,"title": "Full Body Focus","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 23,"id": 607,"title": "Serious Business","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 23,"id": 660,"title": "Power Up Your Morning","duration_id": 3,"duration": "50-60 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 24,"id": 643,"title": "Leg bones connect to the hip bone","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"}, {"schedule_id": 24,"id": 595,"title": "The leg connection","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36","concentration": "Core, Lower Body"}, {"schedule_id": 24,"id": 575,"title": "Pilates Full Body Action","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 25,"id": 543,"title": "Full body with low body focus","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37","concentration": "Core, Full Body"}, {"schedule_id": 25,"id": 678,"title": "Tight Core","duration_id": 2,"duration": "30-40 min","concentrations_id": "[37]","concentration": "Full Body"}, {"schedule_id": 24,"id": 622,"title": "Move Fast","duration_id": 2,"duration": "30-40 min","concentrations_id": "[36, 37","concentration": "Full Body with Lower focus"}]';
const SCHEDULE_MAX = 25;
//597 530 701 654
let schedule = {};


schedule.getList$ = () =>{
	let results = {};
	results.workouts = JSON.parse(ALL_SCHEDULES).map((klass) => {
							klass.instructor_video_id = 1;
							return klass;
						});	
	return Observable.of(JSON.parse(ALL_SCHEDULES));
};

schedule.getListById$ = (id) =>{
	let results = {};	
	results.workouts = schedule.getFiltered(id);
	return Observable.of(results);	
};

schedule.getListByDate$ = (d) =>{
	let results = {};
	let id = schedule.getWeekId(d);
	results.workouts = schedule.getFiltered(id);
	return Observable.of(results);	
};

schedule.getFiltered = (id) => {
	return JSON.parse(ALL_SCHEDULES)						
						.filter((el) => {return (el.schedule_id == id) })						
						.map((klass, index) => {							
							// if (index % 2 == 0){
							// 	klass.instructor_video_id = 4;
							// 	klass.instructor_video_name = "Laura Locker";
							// }else{
								klass.instructor_video_id = 1;
								klass.instructor_video_name = "Jodi Brinkman";
							// }
							return klass;
						});	
}

schedule.getWeekId = (userDate) => {
	let id = 1;
	try{
		let created_at = new Date(userDate);
	    let cutoff_date = new Date("2018-09-02T00:00:00.000Z");
	    if ( created_at > cutoff_date){
	        cutoff_date = created_at;
	    }	   
	    let today = new Date();    
	    let weeksBtw = Math.floor(Math.abs(cutoff_date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7));
	   
	    if ((weeksBtw) && ( weeksBtw > SCHEDULE_MAX )){
	        id = weeksBtw % SCHEDULE_MAX;
	    }else{
	        id = weeksBtw;
	    }

	    if(id == 0){
	    	id = 1;
	    };	   
	    //console.log("weeksBtw", id);
	    return id;

	}catch(error){
		console.log("ERROR GETTING WEEK ID FOR SCHEDULE, RETURN DEFAULT", error);
		return 1;
	}
}



module.exports = schedule;
