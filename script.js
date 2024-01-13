var fxArray = {
    '0' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/the_dark_footsteps.mp3',
    '1' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/the_dark_thud.wav',
    '2' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/buttonHoverScary.wav',
    '3' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/drinking.wav',
    '4' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/Clothes_Backpack_02-%5BAudioTrimmer.com%5D.mp3',
    '5' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/Eat%20Vegetables%201-%5BAudioTrimmer.com%5D.mp3',
    '6' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/Low%20Hits%20(2).wav',
    '7' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/foley_cloth_light_fast_movement_long_01.mp3',
    '8' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/Zombies%203.mp3',
    '9' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/counter-03-by_YIO.wav'
}
var bgArray = {
    '0' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/The%20Plague%20Doctor%20(online-audio-converter.com).mp3',
    '1' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/the_dark_water.mp3'
}

var masterFx = [];
var masterBg = [];


function prepareAudio(audio, array, looping) {
    Object.keys(audio).forEach(function(key) {
        let a = new Audio(audio[key]);
        a.loop = looping;
        array.push(a);
    })
}

audio = true;
sfx = true;

prepareAudio(fxArray, masterFx, false);
prepareAudio(bgArray, masterBg, true);

function playFx(id, volume) {
    if(audio) {
        masterFx[id].volume = volume;
        masterFx[id].play();
    }
}

function playBg(id, volume) {
    if(sfx) {
        masterBg[id].volume = volume;
        masterBg[id].play();
    }
}

$('.js-restart').click(function () {
    game.food = 10;
    game.water = 10;
    game.meds = 5;
    game.day = 30;
    game.health = 100;
    game.hunger = 100;
    game.thirst = 100;
    game.xp = 100;
    game.fatigue = 100;
    game.alive = true;
    $('.js-day span').html(game.day);
    $('.scavengePanel').html('')
    $('.game_main').css('pointer-events', 'all')
    game.updateUI(foodInventoryElement, game.food);
    game.updateUI(waterInventoryElement, game.water);
    game.updateUI(hungerStatElement, game.hunger);
    game.updateUI(thirstStatElement, game.thirst);
    game.updateUI(healthStatElement, game.health);
    game.updateUI(fatigueStatElement, game.fatigue);
    game.updateUI(medsInventoryElement, game.meds);
    $(this).parent().parent().hide();

    game.updateStat('fatigue', 0, fatigueStatElement);
    game.updateStat('hunger', 0, hungerStatElement);
    game.updateStat('thirst', 0, thirstStatElement);
    game.updateStat('health', 0, healthStatElement);


    $('.js-nextDay').hide();
    $('.js-rest').show();
  
    $('.js-medScavenge').hide()
    game.scavenging = false;
    game.scavenged = false;
    game.updateSpeech('Phew. Back at last')
    $('.scavengeOverlay').css('opacity', '0');
    $('.c').css('opacity', 1);
    
        characterData.name = characterCreationForm.find('input[name="name"]').val();
    characterData.gender = characterCreationForm.find('input[name="gender"]:checked').val();
    characterData.age = characterCreationForm.find('input[name="age"]').val();
    characterData.career = characterCreationForm.find('.js-career h5').html();
    characterData.traits = [];

    characterData.attributes[ characterCreationForm.find('.career').data('attr')] += characterCreationForm.find('.career').data('attrchange');

    $('.traits .trait').each(function(t) {
        let traitAttr = $(this).data('attr');
        let traitAttrChange = $(this).data('attrchange');
        characterData.attributes[traitAttr] += traitAttrChange
        characterData.traits.push($(this).find('h5').html());
    });
    
 
})

// HTML Elements
const characterCreationForm = $('.characterForm');

// Get random character
function getRandomCharacter() {
    getRandomGender(); // Pick a random gender

    let selectedGender = characterCreationForm.find('input[name="gender"]:checked').val(); // Find selected gender

    getRandomName(selectedGender); // Pick a random full name
    getRandomAge(18, 80); // Pick a random age
    getRandomCareer(); // Pick a random career
    getRandomTraits(); // Pick random traits
    getRandomImage(selectedGender);
}

// Get random name
function getRandomName(selectedGender) {

    // Find random first name from array
    let randomFirstNameArray = firstNames[selectedGender];
    let firstNamesArrayLength = randomFirstNameArray.length - 1;
    let randomFirstName = randomFirstNameArray[getRandomBetween(0, firstNamesArrayLength)];

    // Find random last name from array
    let randomLastName = lastNames[getRandomBetween(0, lastNames.length - 1)];
    let randomFullName = `${randomFirstName} ${randomLastName}`;

    // Update the field
    characterCreationForm.find('input[name="name"]').val(randomFullName); 
}

// Get random gender
function getRandomGender() {
    // Find out how many genders there are
    let currentSelectedGender = characterCreationForm.find('input[name="gender"]:checked').val();
    const genderCount = characterCreationForm.find('input[name="gender"]').length;
    let randomGenderNumber = getRandomBetween(1, genderCount);
    let randomGender = characterCreationForm.find(`input[name="gender"]:nth-of-type(${randomGenderNumber})`);

    if(currentSelectedGender == randomGender.val()) {
        getRandomGender();
    } else {
        // Check it
        randomGender.click();   
    } 
}

// Get random age
function getRandomAge(min, max) {
    let randomAge = getRandomBetween(min, max);

    // Update the field
    characterCreationForm.find('input[name="age"]').val(randomAge);
}

$('.js-career, .js-trait, label, .button, .js-randomize, .js-createCharacter, .row .button').mouseenter(function() {

    playFx(2, 1)
})


function getRandomCareer() {
    // Select a random career
    let randomCareerNumber = getRandomBetween(0, Object.keys(careers).length - 1);
    let rc = careers[randomCareerNumber]


    $('.js-career').html(`<div class='career' data-attr="${rc.attribute.attributeName}" data-attrChange="${rc.attribute.attributeChange}">
<div class='career_header'><div class="cIcon" style="background-position:-${randomCareerNumber * 100}% center"></div><h5>${rc.careerName}</h5></div><div class='career_text'><p>${rc.flavourText}</p></div><div class='career_attributes'><span class='value'>${format(rc.attribute.attributeChange)}</span> to <span class='attr'>${rc.attribute.attributeName}</span></div></div>`)
}

function getRandomImage(gender) {
    let randomHair =  getRandomBetween(1, 8);
    let randomSkin =  getRandomBetween(1, 4);
    let randomShirt =  getRandomBetween(1, 5);
    let randomLegs =  getRandomBetween(1, 6);

    if(gender == 'male') {
        $('.c_hairMale').css('background-position', 100 * randomHair + '%');
        $('.c_hairFemale').hide();
        $('.c_hairMale').show();
    } else {
        $('.c_hairFemale').css('background-position', 100 * randomHair + '%');
        $('.c_hairFemale').show();
        $('.c_hairMale').hide();
    }

    $('.c_skin').css('background-position', 100 * randomSkin + '%')
    $('.c_pants').css('background-position', 100 * randomLegs + '%')
    $('.c_shirt').css('background-position', 100 * randomShirt + '%')

}

// Get random character traits. This gets 2 positive traits and one negative trait.
function getRandomTraits() {
    // Set the traits HTML to contain none
    $('.traits .js-trait').html('');

    // Select the first random positive trait
    let randomTraitNumberOne = getRandomBetween(0, Object.keys(traits['positive']).length - 1);
    let rto = traits['positive'][randomTraitNumberOne];

    // Now append that trait to the HTML
    $('.pos.traits .js-trait.trait-one').append(`<div class='trait positive' data-attr="${rto.attribute.attributeName}" data-attrChange="${rto.attribute.attributeChange}"><div class='trait_header'><div class="tIcon" style="background-position:-${randomTraitNumberOne * 100}% center"></div><h5>${rto.traitName}</h5></div><div class='trait_attributes'><span class='value'>${format(rto.attribute.attributeChange)}</span> to <span class='attr'>${rto.attribute.attributeName}</span></div></div>`);

    // Now select the second random positive trait
    let randomTraitNumberTwo = getRandomBetween(0, Object.keys(traits['positive']).length - 1);

    // If this is the same trait as before
    if(randomTraitNumberTwo == randomTraitNumberOne) {
        getRandomTraits(); // Start the selection process again
    } else {

        // Get the second random positive trait
        let rtt = traits['positive'][randomTraitNumberTwo];

        // Append to HTML
        $('.pos.traits .js-trait.trait-two').append(`<div class='trait positive' data-attr="${rtt.attribute.attributeName}" data-attrChange="${rtt.attribute.attributeChange}"><div class='trait_header'><div class="tIcon" style="background-position: -${randomTraitNumberTwo * 100}% center"></div><h5>${rtt.traitName}</h5></div><div class='trait_attributes'><span class='value'>${format(rtt.attribute.attributeChange)}</span> to <span class='attr'>${rtt.attribute.attributeName}</span></div></div>`);

        // Now select the only negative trait
        let randomTraitNumber = getRandomBetween(0, Object.keys(traits['negative']).length - 1);
        let rt = traits['negative'][randomTraitNumber];

        // Append negative trait to HTML
        $('.neg.traits .js-trait.trait-one').append(`<div class='trait negative' data-attr="${rt.attribute.attributeName}" data-attrChange="${rt.attribute.attributeChange}"><div class='trait_header'><div class="tIcon neg" style="background-position:-${randomTraitNumber * 100}% center"></div><h5>${rt.traitName}</h5></div><div class='trait_attributes'><span class='value'>${format(rt.attribute.attributeChange)}</span> to <span class='attr'>${rt.attribute.attributeName}</span></div></div>`);
    }
}

function setLevels() {
    $('.game_main__training .skills').html('')

    Object.keys(characterData.attributes).forEach(function(a) {
        let skillName = a;
        let skillLevel = characterData.attributes[a];

        if(a != 'hunger') {
            if(a != 'thirst') {
                if(skillLevel >= 0 ) {
                    if(skillLevel >= 20) {
                        $('.game_main__training .skills').append(`<div class="row maxed"><div class="row_left"><p class="name">${skillName}</p><p class="level">Lvl <span>${skillLevel}</span></p></div><div class="row_center"><p>${tooltips[skillName]}</p></div><div class="button" data-cost="${100 + (skillLevel * 25)}" data-attr="${a}">Level up<span>${100 + (skillLevel * 25)}xp</span></div></div>`);  
                    } else {
                        $('.game_main__training .skills').append(`<div class="row"><div class="row_left"><p class="name">${skillName}</p><p class="level">Lvl <span>${skillLevel}</span></p></div><div class="row_center"><p>${tooltips[skillName]}</p></div><div class="button" data-cost="${100 + (skillLevel * 25)}" data-attr="${a}">Level up<span>${100 + (skillLevel * 25)}xp</span></div></div>`);
                    }
                } else {
                    $('.game_main__training .skills').append(`<div class="row cantLevel"><div class="row_left"><p class="name">${skillName}</p><p class="level">Lvl <span>${skillLevel}</span></p></div><div class="row_center"><p>${tooltips[skillName]}</p></div><div class="button" data-cost="${100 + (skillLevel * 25)}" data-attr="${a}">Level up<span>${100 + (skillLevel * 25)}xp</span></div></div>`); 
                }
            }
        }
    })
    
    $(document).on("mouseenter",".row .button",function() {
        playFx(2, 1);
    })
}

$('.close').click(function() {
    $('.game_main__training').fadeOut(600)
    $('.game_main__left, .game_main__right').css('pointer-events', 'all')
})

$('.js-showTraining').click(function(){
    $('.game_main__training').fadeIn(600);
    $('.game_main__left, .game_main__right').css('pointer-events', 'none')
})

function buildCharacter() {

    characterData.name = characterCreationForm.find('input[name="name"]').val();
    characterData.gender = characterCreationForm.find('input[name="gender"]:checked').val();
    characterData.age = characterCreationForm.find('input[name="age"]').val();
    characterData.career = characterCreationForm.find('.js-career h5').html();
    characterData.traits = [];

    characterData.attributes[ characterCreationForm.find('.career').data('attr')] += characterCreationForm.find('.career').data('attrchange');

    $('.traits .trait').each(function(t) {
        let traitAttr = $(this).data('attr');
        let traitAttrChange = $(this).data('attrchange');
        characterData.attributes[traitAttr] += traitAttrChange
        characterData.traits.push($(this).find('h5').html());
    });
    setLevels()

}

$('.characterName .js-reroll').click(function() {
    let selectedGender = characterCreationForm.find('input[name="gender"]:checked').val(); // Find selected gender
    getRandomName(selectedGender); // Pick a random full name
})

$('.characterAge .js-reroll').click(function() {
    getRandomAge(18, 80); // Pick a random full name
})

$('.characterGender .js-reroll').click(function() {
    getRandomGender(); // Pick a random full name
})

$('.car .js-reroll').click(function() {
    getRandomCareer(); // Pick a random full name
})

$('.preview .js-reroll').click(function() {
    let selectedGender = characterCreationForm.find('input[name="gender"]:checked').val(); // Find selected gender
    getRandomImage(selectedGender); // Pick a random full name
})

$('.characterAge input').blur(function() {
    if($(this).val() < 16) {
        $(this).val(16);
    }

    if($(this).val() > 80) {
        $(this).val(80);
    }
})

$(document).on('click', '.row .button', function () {
    let cost = $(this).data('cost');
    let attr = $(this).data('attr')
    if(game.xp >= cost) {
        game.xp -= cost;
        characterData.attributes[attr]++;
        game.updateUI(xpInventoryElement, game.xp);
    
        setAttributes()
        setLevels()
    }


})

$('.js-career').mousemove(function() {
    $('.tooltip p').html(tooltips[$(this).find('.career').data('attr')]);
    $('.tooltip').css('opacity' , 1);
    $('.tooltip').css('transition' , 'opacity 0.3s .5s');
})

$('.js-career, .js-trait').mouseleave(function() {
    $('.tooltip').css('opacity' , 0);
    $('.tooltip').css('transition' , 'opacity 0.3s 0s');
})

$('.js-trait').mousemove(function() {
    $('.tooltip p').html(tooltips[$(this).find('.trait').data('attr')] + '<span>. You cannot train negative traits.</span>');
    $('.tooltip').css('opacity' , 1);
    $('.tooltip').css('transition' , 'opacity 0.3s .5s');
})

$(document).mousemove(function(e){
    var x = e.clientX;     // Get the horizontal coordinate
    var y = e.clientY;     // Get the vertical coordinate


    $('.tooltip').css('left', `${x}px`)
    $('.tooltip').css('top', `${y}px`)
})



// Helper functions

function format(n) {
    return (n>0?'+':'') + n;
}

function getRandomBetween(min, max) {
    let minimum = Math.ceil(min);
    let maximum = Math.floor(max);

    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

$('.js-randomize').click(function() {
    getRandomCharacter();
})

$('.js-createCharacter').click(function() {
    buildCharacter();

    playFx(1, 1)

    $('.game_characterCreation').css('pointer-events', 'none')
    $('.game_characterCreation').css('opacity', 0);
    setTimeout(function () {
        $('.interim').fadeIn(1000);   

    }, 2000)

    setTimeout(function () {
        $('.interim').fadeOut(1000);    
    }, 5000)

    setTimeout(function () {
        $('.game_main').fadeIn(1000);
    }, 7000)
    setAttributes()
    setStats();

})

getRandomCharacter();

var introDone = false;

$(window).click(function (){

    if(!introDone) {
        introDone = true;

        playFx(1, 1);
        playBg(0, .9)

        $('.game_intro').addClass('out');

        setTimeout(function() {
            $('.game_characterCreation').css('opacity', 1);
            $('.game_characterCreation').css('pointer-events', 'all');
        }, 2000)
    }
})
/* ===================================================

Game

===================================================== */

let foodInventoryElement = $('.js-food span');
let waterInventoryElement = $('.js-water span');
let medsInventoryElement = $('.js-meds span');
let xpInventoryElement = $('.js-xp span');

let hungerStatElement = $('.stat--hunger span');
let thirstStatElement = $('.stat--thirst span');
let healthStatElement = $('.stat--health span');
let fatigueStatElement = $('.stat--fatigue span');

let dayCountElement = $('.js-day span');

function setAttributes() {
    scavangeFatigueDrain = 45 - characterData.attributes.fitness;
    scavangeHungerDrain = 25;
    scavangeThirstDrain = 25;
    scavangeHealthDrain = 10;

    dailyHungerDrain = 20 + characterData.attributes.hunger;
    dailyThirstDrain = 30 + characterData.attributes.thirst;

    foodIncrease = 10 + characterData.attributes.cooking;
    thirstIncrease = 10;
    restIncrease = 30 + characterData.attributes.sleep;
    healthIncrease = 15 + characterData.attributes.healing;




    startingFood = 10;
    startingWater = 10;
    startingMeds = 5;


    itemProcChances = {
        'food'  : 22, // % per tick
        'water' : 22,
        'meds'  : 10
    }

    itemMaxFind = {
        'food'  : 3,
        'water' : 3,
        'meds'  : 1
    }

    eventProcChances = {
        'ramble'  : 25,
        'loot'    : 20 + characterData.attributes.looting,
        'fight'   : 10 - characterData.attributes.stealth
    }
}
function setStats() {





    class Game {
        constructor(food, water, meds) {
            this.food = food;
            this.water = water;
            this.meds = meds;

            this.starving = 0;
            this.thirsting = 0;

            this.day = 30;

            this.scavenging = false;
            this.scanvenged = false
            this.transitioning = false;

            this.scavtimer = '';
            this.alive = true;
            this.hunger = 100;
            this.thirst = 100;
            this.fatigue = 100;
            this.health = 100 + characterData.attributes.vitality;
            this.xp = 100;
            this.xpGain = 0;

            this.tickerTime = 500;

        }

        gameLoop() {

            $('.tHeader h4 span').html(game.xp);

            $('.row .button').each(function () {
             


                if(game.xp > $(this).data('cost')) {
                    $(this).addClass('cantAfford')
                }
            }.bind(this))
            if(game.alive) {
                $('.js-eat .info').html('<span><span class="pos">+' + foodIncrease + '</span> hunger</span>');
                $('.js-drink .info').html('<span><span class="pos">+' + thirstIncrease + '</span> thirst</span>');
                $('.js-heal .info').html('<span><span class="pos">+' + healthIncrease + '</span> health</span>');
                $('.js-medScavenge .info').html('<span><span class="pos">+' + healthIncrease + '</span> health</span>');
                $('.js-scavenge .info').html('<span><span class="neg">-' + scavangeFatigueDrain + '</span> energy <span class="neg">-' + scavangeHungerDrain + '</span> hunger <span class="neg">-' + scavangeThirstDrain + '</span> thirst</span>');



                if(this.health <= 0) {


                    this.outputToPanel('You died.', '-- ', '#3bedff');
                    this.alive = false;
                    playFx(1, 1);
                    $('.gameOver').show();
                    $('.gameOver h2 span').html($('.js-day span').html())
                    $('.game_main').css('pointer-events', 'none')


                }

                $('.js-rest .info').html('<span><span class="pos">+' + restIncrease + '</span> energy <span class="neg">-' + dailyHungerDrain + '</span> hunger <span class="neg">-' + dailyThirstDrain + '</span> thirst</span>');
                $('.js-nextDay .info').html('<span><span class="pos">+' + restIncrease / 2 + '</span> energy <span class="neg">-' + dailyHungerDrain / 2 + '</span> hunger <span class="neg">-' + dailyThirstDrain / 2 + '</span> thirst</span>');

                if(this.thirst < 35) {
                    $('.stat--thirst').addClass('danger');
                } else {
                    $('.stat--thirst').removeClass('danger');
                }

                if(this.hunger > 0) {
                    this.starving = 0;
                }

                if(this.thirst > 0) {
                    this.thirsting = 0;
                }

                if(this.hunger < 35) {
                    $('.stat--hunger').addClass('danger');
                } else {
                    $('.stat--hunger').removeClass('danger');
                }

                if(this.fatigue < 25) {
                    $('.stat--fatigue').addClass('danger');
                } else {
                    $('.stat--fatigue').removeClass('danger');
                }

                if(this.health < 35) {
                    $('.stat--health').addClass('danger');
                } else {
                    $('.stat--health').removeClass('danger');
                }



                if(this.health >= 100) {
                    $('.js-medScavenge').addClass('inactive');
                } else {
                    if(this.meds <= 0) {
                        $('.js-medScavenge').addClass('inactive');
                    } else {
                        $('.js-medScavenge').removeClass('inactive');
                    }
                }

                if(this.scavenging) {
                    $('.js-nextDay, .js-eat, .js-drink, .js-heal').addClass('inactive');
                } else {
                    $('.js-nextDay, .js-eat, .js-drink, .js-heal').removeClass('inactive');

                    if(this.food <= 0) {
                        $('.js-eat').addClass('inactive');
                    } else {
                        $('.js-eat').removeClass('inactive');
                    }

                    if(this.scavenged == false) {

                        if(this.fatigue < 25) {
console.log('not enough energy')
                            $('.js-scavenge').addClass('inactive');
                        } else {
                            $('.js-scavenge').removeClass('inactive');
                        }
                    }

                    if(this.hunger >= 100) {
                        $('.js-eat').addClass('inactive');
                    } 

                    if(this.water <= 0) {
                        $('.js-drink').addClass('inactive');
                    } else {
                        $('.js-drink').removeClass('inactive');
                    }

                    if(this.thirst >= 100) {
                        $('.js-drink').addClass('inactive');
                    } 

                    if(this.meds <= 0) {
                        $('.js-heal, .js-medScavenge').addClass('inactive');
                    } else {
                        $('.js-heal, .js-medScavenge').removeClass('inactive');
                    }

                    if(this.health >= 100) {
                        $('.js-heal, .js-medScavenge').addClass('inactive');
                    } 
                }
            }
        }

        updateItemCount(item, count, el) {

            if(this[item] >= 0) {


                this[item] += count;

                this.updateUI(el, this[item]);
                
                if(count > 0) {
                    el.append('<span class="popupCount">+ ' + count + '</span>')
                } else {
                    el.append('<span class="popupCount neg"> ' + count + '</span>')
                }
                
            } else {

            }
        }

        updateStat(stat, amount, el) {
            this[stat] += amount;

            if (this[stat] < 0) {
                this[stat] = 0;
            }

            if (this[stat] > 100) {
                this[stat] = 100;
            }

            this.updateStatUI(el, this[stat]);
        }

        updateSpeech(s) {
            $('.speech').html(s);
        }

        updateUI(prop, val) {
            prop.html(val);
        }

        updateStatUI(prop, val) {
            prop.css('width', val + '%');
        }

        nextDay() {
            playFx(6, 1)

            
            if(this.hunger <= 0) {
                this.starving++;
            }

            if(this.thirst <= 0) {
                this.thirsting++;
            }
            
            if(this.day == 1) {
                this.outputToPanel('You got rescued.', '-- ', '#3bedff');
                this.alive = false;
                playFx(1, 1);
                $('.gameWin').show();
                $('.game_main').css('pointer-events', 'none')
            }

            if(this.starving >= 2) {
                this.outputToPanel('You died.', '-- ', '#3bedff');
                this.alive = false;
                playFx(1, 1);
                $('.gameOver').show();
                $('.gameOver h1').html('You died of hunger')
                $('.gameOver h2 span').html(parseInt(this.day - 1))
                $('.game_main').css('pointer-events', 'none')
            }

            if(this.thirsting >= 2) {
                this.outputToPanel('You died.', '-- ', '#3bedff');
                this.alive = false;
                playFx(1, 1);
                $('.gameOver').show();
                $('.gameOver h1').html('You died of thirst')
               $('.gameOver h2 span').html(parseInt(this.day - 1))
                $('.game_main').css('pointer-events', 'none')
            }


            setTimeout(function() {
                $('.game_main').fadeOut(500);
            }, 500)
            this.scavenged = false;

            var that = this;

            setTimeout(function() {

                that.day--;
                $('.js-day span').html(that.day);
                $('.js-scavenge').removeClass('inactive');
                $('.js-nextDay').hide();
                that.updateSpeech('Good morning');
                that.scanvenged = false

                if(that.hunger < 35) {
                    that.updateSpeech('Im starving')
                }

                if(that.fatigue < 25) {
                    that.updateSpeech('Im too tired to scavenge')
                }

                if(that.thirst < 35) {
                    that.updateSpeech('Im so thirsty')
                }
            }, 1000)

            setTimeout(function() {
                $('.game_main').fadeIn(1000);
            }, 1500)
        }

        outputToPanel(output, time, color) {
            $('.scavengePanel').append(`<p style="color: ${color}"><span>${time}</span> ${output}</p>`)
            $('.scavengePanel').scrollTop($('.scavengePanel').prop('scrollHeight'));


        }

        formatNumber(number) {
            if(number == 0) {
                number = '0' + number;
            }

            return number;
        }

        beginScavengePhase() {
            
            
            var minutes = 0;
            var hours = 10;
            var endTime = 18;

            var that = this;

            this.xpGain = 0;
            $('.scavengePanel').html('');
            $('.game_main__left').css('opacity', 0);
            $('.game_main__right').css('opacity', 0);
            $('.game_main__right, .game_main__left').css('pointer-events', 'none');
            $('.game_main__bottom').fadeIn();
            
            $('.js-medScavenge').show()
            var dayTimer = setInterval(function() {
                if(that.alive) {
                    minutes += 15;

                    if(minutes > 59) {
                        minutes = 0;
                        hours++;
                    }

                    if(hours == endTime) {
                        window.clearInterval(dayTimer);
                        setTimeout(function() {
                            $('.game_main__bottom').fadeOut(600);
                        }, 1000)
                        
                        setTimeout(function() {
                              $('.game_main__left').css('opacity', 1);
            $('.game_main__right').css('opacity', 1);
            $('.game_main__right, .game_main__left').css('pointer-events', 'all');
                        }, 1600)
                        that.scavenging = false;
                        game.scavenged = true;
                        game.updateSpeech('Phew. Back at last')
                        //$('.scavengeOverlay').css('opacity', '0');
                        $('.c').css('opacity', 1);
                        that.xp += Math.ceil(that.xpGain + ((that.xpGain / 100) * characterData.attributes.intelligence));
                        that.outputToPanel(`OK, time to head home. I gained ${that.xpGain} experience`, endTime + ':00', '#3bedff');

                        that.updateUI(xpInventoryElement, that.xp);
                        that.updateStat('fatigue', -scavangeFatigueDrain, fatigueStatElement);
                        that.updateStat('hunger', -scavangeHungerDrain, hungerStatElement);
                        that.updateStat('thirst', -scavangeThirstDrain, thirstStatElement);
                    }

                    that.tick(hours, minutes);
                } else {
                    clearInterval(dayTimer)
                }
            }, this.tickerTime);
        }

        tick(hours, minutes) {
            // This is fired every game tick during scavenge


            let randomEventSeed = getRandomBetween(1, 100);
            let runningEventChance = 0;

            Object.keys(eventProcChances).forEach(function(ev) {
                let event = ev;
                let chance = eventProcChances[event];

                if(randomEventSeed >= runningEventChance + 1 && randomEventSeed <= runningEventChance + chance) {
                    if(ev == 'loot') {
                        this.randomItems(hours, minutes);

                    } else if (ev == 'ramble') {
                        this.ramble(hours, minutes)
                    } else if (ev == 'fight'){
                        this.fight(hours, minutes)
                        playFx(8, .05)
                    }
                }
                runningEventChance += chance;
            }.bind(this))
        }

        ramble(hours, minutes) {
            let rambleItemSeed = getRandomBetween(1, rambles.length - 1);
            this.outputToPanel(`${rambles[rambleItemSeed]}`, `${hours}:${this.formatNumber(minutes)}`, '#c0d0c0');
        }

        fight(hours, minutes) {



            let randomEnemy = getRandomBetween(1, enemies.length - 1);
            let randomEnemyAmount = getRandomBetween(1, 5);

            this.xpGain += getRandomBetween(3, 15) * randomEnemyAmount;

            // Compute damage

            let damageRoll = getRandomBetween(1, 5);
            let damageTotal = Math.ceil((damageRoll * randomEnemyAmount) - (((damageRoll * randomEnemyAmount) / 100) * characterData.attributes.resistance))

            let enemyName = enemies[randomEnemy];
            this.outputToPanel(`I've encountered ${randomEnemyAmount} ${enemyName}! I took a total of ${damageTotal} damage`, `${hours}:${this.formatNumber(minutes)}`, '#ff6a52');
            this.updateStat('health', -damageTotal, healthStatElement);

            this.update
        }

        randomItems(hours, minutes) {
            let randomItemSeed = getRandomBetween(1, 100);
            let runningItemChance = 0;

            Object.keys(itemProcChances).forEach(function(it) {
                let item = it;
                let chance = itemProcChances[it];

                if(randomItemSeed >= runningItemChance + 1 && randomItemSeed <= runningItemChance + chance) {
                    let randomItemAmount = getRandomBetween(1, itemMaxFind[it]);
                    //this[it] += randomItemAmount;
                    this.xpGain += getRandomBetween(5, 20);
                    playFx(4, .3)

                    let randomLocation =  getRandomBetween(1, locations.length - 1);
                    let rl = locations[randomLocation];

                    let randomColloquial = getRandomBetween(1, items[it].colloquial.length - 1);
                    let rc = items[it].colloquial[randomColloquial];


                    this.updateItemCount(it, randomItemAmount, eval(it + 'InventoryElement'));

                    this.outputToPanel(`I found ${randomItemAmount} ${rc} ${rl}`, `${hours}:${this.formatNumber(minutes)}`, '#86f92f');
                }

                runningItemChance += chance;

            }.bind(this))
        }

        initStats() {

            $('.playerName').html(characterData.name);
            //$('.playerCareer').html(characterData.career);

            this.updateUI(foodInventoryElement, this.food);
            this.updateUI(waterInventoryElement, this.water);
            this.updateUI(hungerStatElement, this.hunger);
            this.updateUI(thirstStatElement, this.thirst);
            this.updateUI(healthStatElement, this.health);
            this.updateUI(fatigueStatElement, this.fatigue);
            this.updateUI(medsInventoryElement, this.meds);
            this.updateUI(xpInventoryElement, this.xp);
        }
    }

    game = new Game(startingFood, startingWater, startingMeds);
    game.initStats();
    setInterval(function() {
        game.gameLoop();
    }, 10)



    $('.js-rest').click(function() {
        if(!game.transitioning) {
            game.updateSpeech('OK. Ill get some rest')
            game.nextDay();

            $('.js-scavenge').addClass('inactive');

            setTimeout(function() {

                game.updateStat('hunger', -dailyHungerDrain, hungerStatElement);
                game.updateStat('thirst', -dailyThirstDrain, thirstStatElement);
                 game.updateStat('health', 10, healthStatElement);
                game.updateStat('fatigue', restIncrease, fatigueStatElement);
                game.transitioning = false;
            }, 2000)
            game.transitioning = true;
        }
    })

    $('.js-eat').click(function() {
        game.updateSpeech('That tasted terrible')
        if(game.hunger < 100 && game.food > 0) {
            playFx(5, 1)
            game.updateItemCount('food', -1, foodInventoryElement);
            game.updateStat('hunger', foodIncrease, hungerStatElement);
        }
    })

    //$(document)

    $('.js-drink').click(function() {
        game.updateSpeech('That helps')
        if(game.thirst < 100 && game.water > 0) {
            playFx(3, 1)
            game.updateItemCount('water', -1, waterInventoryElement);
            game.updateStat('thirst', thirstIncrease, thirstStatElement);
        }
    })

    $('.js-heal, .js-medScavenge').click(function() {
        game.updateSpeech('Ahhh much better')
        if(game.health < 100 && game.meds > 0) {
            playFx(7, 1)
            game.updateItemCount('meds', -1, medsInventoryElement);
            game.updateStat('health', healthIncrease, healthStatElement);
        }
    })

    $('.js-scavenge').click(function() {
        game.updateSpeech('OK. But i dont want to')

        $(this).addClass('inactive');
        $('.js-rest').hide();
        $('.js-nextDay').show();
        game.scavenging = true;
        $('.scavengeOverlay').css('opacity', '1');

        game.beginScavengePhase();
    })

    $('.js-nextDay').click(function() {
        if(!game.transitioning) {
            game.nextDay();
            game.updateSpeech('Good idea')
            setTimeout(function() {

                $(this).hide();
                $('.js-scavenge').removeClass('inactive');
                $('.js-rest').show();
            }, 1000)
            setTimeout(function() {
                game.updateStat('hunger', -dailyHungerDrain / 2, hungerStatElement);
                game.updateStat('thirst', -dailyThirstDrain / 2, thirstStatElement);
                game.updateStat('fatigue', restIncrease / 2, fatigueStatElement);
            }, 2000)
            game.transitioning == true;
        }
    })
}

var shareUrl = 'https://codepen.io/jcoulterdesign/pen/eJGoOx';

function twShare(url, title, winWidth, winHeight) {
    var winTop = 100;
    var winLeft = 100;
    window.open('https://twitter.com/intent/tweet?text='+title, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}


$('.js-share').click(function(){
    twShare('https://codepen.io/jcoulterdesign/full/a8935b1dab6a87c17086b79b68c36488', `I didnt make it till rescue on Toxic, a game by @jamiecoulter89. There was only ${$('.js-day span').html()} days left till rescue came. How long can you survive? https://bit.ly/2rvq7qq`, 520, 350);
})

$('.js-shareWin').click(function(){
    twShare('https://codepen.io/jcoulterdesign/full/a8935b1dab6a87c17086b79b68c36488', `I managed to get rescued on Toxic, a game by @jamiecoulter89. How long can you survive? https://bit.ly/2rvq7qq`, 520, 350);
})

// Bugs
// Reset training on restart
// Can still scavenge when tired