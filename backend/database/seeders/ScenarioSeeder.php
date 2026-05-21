<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Scenario;
use App\Models\ScenarioNode;
use App\Models\ScenarioOption;

class ScenarioSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate existing data to start fresh
        ScenarioOption::truncate();
        ScenarioNode::truncate();
        Scenario::truncate();

        $scenarios = [
            [
                'title' => 'The Stolen Logo',
                'description' => 'A rival company has started using a logo very similar to yours. What do you do?',
                'character' => 'Legal Advisor',
                'start_text' => 'We noticed that "TechCorp" is using a logo that looks almost identical to ours. We need to decide how to respond.',
                'options' => [
                    [
                        'text' => 'Ignore it, it\'s probably fine.',
                        'result' => 'By ignoring it, they established a market presence, and it became much harder to protect our trademark later. This led to customer confusion.'
                    ],
                    [
                        'text' => 'Send a cease and desist letter immediately.',
                        'result' => 'We sent a cease and desist letter. They realized their mistake, apologized, and changed their logo. Trademark successfully defended!'
                    ],
                    [
                        'text' => 'Sue them for millions without warning.',
                        'result' => 'The judge threw out the case because we didn\'t attempt to resolve it outside of court first. We wasted time and legal fees.'
                    ],
                    [
                        'text' => 'Publicly shame them on social media.',
                        'result' => 'While it gained attention, they sued us for defamation. We lost focus on our business and entered a messy legal battle.'
                    ]
                ]
            ],
            [
                'title' => 'Software Algorithm Theft',
                'description' => 'A competitor released an app with an identical sorting algorithm you spent months developing.',
                'character' => 'CTO',
                'start_text' => 'Our new proprietary sorting algorithm was just copied by a competitor. We haven\'t filed a patent yet. What\'s our move?',
                'options' => [
                    [
                        'text' => 'Claim copyright infringement on the code.',
                        'result' => 'Copyright protects the written code, but not the underlying logic or algorithm. Unless they copy-pasted our exact source code, we lose.'
                    ],
                    [
                        'text' => 'File for a patent immediately and sue.',
                        'result' => 'You cannot sue for infringement that occurred before the patent was granted. Also, since it\'s public now, getting a patent might be harder.'
                    ],
                    [
                        'text' => 'Claim trade secret misappropriation.',
                        'result' => 'Since we kept the algorithm secret and they somehow stole it (e.g. corporate espionage or ex-employee), we successfully sued them for trade secret theft!'
                    ],
                    [
                        'text' => 'Make our algorithm open source.',
                        'result' => 'We gained community goodwill, but we lost our competitive advantage. We can no longer monetize the algorithm exclusively.'
                    ]
                ]
            ],
            [
                'title' => 'The Rogue Employee',
                'description' => 'A top salesperson leaves to start their own firm and takes your client list.',
                'character' => 'HR Manager',
                'start_text' => 'John left the company yesterday. We just found out he downloaded our entire confidential client list before leaving. What should we do?',
                'options' => [
                    [
                        'text' => 'Nothing. Client lists aren\'t protected.',
                        'result' => 'Wrong. A confidential client list can be a Trade Secret. John poached all our top clients and our revenue dropped 40%.'
                    ],
                    [
                        'text' => 'Enforce his Non-Disclosure Agreement (NDA).',
                        'result' => 'Success! We reminded him of the NDA he signed. He returned the data and refrained from contacting our clients to avoid a lawsuit.'
                    ],
                    [
                        'text' => 'Call the police to arrest him for theft.',
                        'result' => 'The police consider this a civil matter, not criminal. We wasted valuable time while John contacted our clients.'
                    ],
                    [
                        'text' => 'Steal his new company\'s client list in retaliation.',
                        'result' => 'We committed a crime. We were sued and faced criminal charges. Not a smart move.'
                    ]
                ]
            ],
            [
                'title' => 'Cybersquatting Trouble',
                'description' => 'Someone registered a domain name identical to your famous trademark.',
                'character' => 'Marketing Director',
                'start_text' => 'We were about to launch our new product "GigaWidget", but someone just bought gigawidget.com and wants $50,000 for it.',
                'options' => [
                    [
                        'text' => 'Pay the $50,000 ransom.',
                        'result' => 'We got the domain, but we lost a lot of money and funded a cybersquatter.'
                    ],
                    [
                        'text' => 'Change our product name.',
                        'result' => 'We lost all our pre-launch brand awareness and had to spend millions rebranding.'
                    ],
                    [
                        'text' => 'File a UDRP complaint.',
                        'result' => 'Correct! Since we hold the trademark and they registered it in bad faith to extort us, the arbitration panel transferred the domain to us for a small fee.'
                    ],
                    [
                        'text' => 'Hack their servers to take it back.',
                        'result' => 'We committed a cybercrime. The FBI got involved and our company was severely penalized.'
                    ]
                ]
            ],
            [
                'title' => 'AI Generated Art',
                'description' => 'Your team used an AI image generator for your new product packaging.',
                'character' => 'Lead Designer',
                'start_text' => 'I generated these awesome images using an AI tool for our new packaging. Can we copyright them so competitors don\'t copy the art?',
                'options' => [
                    [
                        'text' => 'Yes, file for copyright immediately.',
                        'result' => 'The Copyright Office rejected our application. Purely AI-generated art lacks the "human authorship" required for copyright protection.'
                    ],
                    [
                        'text' => 'No, AI art is public domain.',
                        'result' => 'True, we can\'t copyright the raw AI output. Anyone can use it, meaning our competitors legally copied our packaging art.'
                    ],
                    [
                        'text' => 'Have a human heavily edit the AI art.',
                        'result' => 'Good move! By adding substantial human creative input and modifications to the AI base, we were able to copyright the final composed image.'
                    ],
                    [
                        'text' => 'Claim we drew it by hand.',
                        'result' => 'Committing fraud on a copyright application invalidated our copyright and resulted in severe fines.'
                    ]
                ]
            ],
            [
                'title' => 'Music Sampling Dilemma',
                'description' => 'Your marketing video uses a 3-second clip from a famous pop song.',
                'character' => 'Video Editor',
                'start_text' => 'I added a 3-second clip of a Taylor Swift song to our new ad. It\'s less than 5 seconds so it\'s "Fair Use", right?',
                'options' => [
                    [
                        'text' => 'Yes, proceed with publishing the ad.',
                        'result' => 'Wrong! There is no "5-second rule". We were sued by the record label and had to pull our entire multi-million dollar ad campaign.'
                    ],
                    [
                        'text' => 'No, we must get a license first.',
                        'result' => 'Correct! We contacted the rights holders, paid for a synchronization license, and legally used the track to make our ad a viral hit.'
                    ],
                    [
                        'text' => 'Just alter the pitch so content ID misses it.',
                        'result' => 'While the automated bots missed it, a fan reported it. The label sued us for willful infringement, resulting in massive statutory damages.'
                    ],
                    [
                        'text' => 'Credit the artist in the description.',
                        'result' => 'Crediting the creator does not negate copyright infringement. We still got a DMCA takedown strike.'
                    ]
                ]
            ],
            [
                'title' => 'Reverse Engineering',
                'description' => 'A competitor bought your hardware product and took it apart to see how it works.',
                'character' => 'Lead Engineer',
                'start_text' => 'A competitor bought our new drone, disassembled it, and figured out how our rotors work. Can we sue them?',
                'options' => [
                    [
                        'text' => 'Yes, reverse engineering is illegal.',
                        'result' => 'Wrong. Reverse engineering a legally purchased product is generally legal unless protected by patents.'
                    ],
                    [
                        'text' => 'Sue them for Trade Secret theft.',
                        'result' => 'Trade secrets are lost if the product can be easily reverse engineered. We lost the case.'
                    ],
                    [
                        'text' => 'Only if we have a Patent on the rotor design.',
                        'result' => 'Exactly! Because we secured a utility patent on the rotor mechanism, they cannot manufacture or sell a drone using our invention, even if they figured it out.'
                    ],
                    [
                        'text' => 'Claim Copyright on the physical rotor.',
                        'result' => 'Copyright applies to creative works, not functional hardware designs. The case was dismissed.'
                    ]
                ]
            ],
            [
                'title' => 'The Accidental Blog Post',
                'description' => 'An intern accidentally posts your secret recipe to the company blog.',
                'character' => 'PR Manager',
                'start_text' => 'Oh no! The intern just published our top-secret sauce recipe on our public blog. It was up for 2 hours before we deleted it.',
                'options' => [
                    [
                        'text' => 'It\'s still our Trade Secret.',
                        'result' => 'Unfortunately, once a trade secret is made public—even accidentally—it loses its legal protection as a trade secret forever.'
                    ],
                    [
                        'text' => 'File for a patent immediately.',
                        'result' => 'Recipes are notoriously difficult to patent, and since it\'s now public knowledge, it might be considered prior art. We struggled to protect it.'
                    ],
                    [
                        'text' => 'Claim Copyright on the recipe list.',
                        'result' => 'You cannot copyright a mere listing of ingredients. Competitors legally copied the sauce.'
                    ],
                    [
                        'text' => 'Send takedowns to anyone who copied it.',
                        'result' => 'Since it was a trade secret that was publicly disclosed by our own fault, we had no legal grounds for takedowns.'
                    ]
                ]
            ],
            [
                'title' => 'Parody Defense',
                'description' => 'A comedy show uses a distorted version of your trademarked mascot in a sketch.',
                'character' => 'Brand Manager',
                'start_text' => 'A late-night comedy show used a twisted, funny version of our mascot to make a joke about capitalism. Should we sue for Trademark infringement?',
                'options' => [
                    [
                        'text' => 'Yes, it damages our brand.',
                        'result' => 'We sued, but lost. The court ruled it was a clear "Parody," which is protected under the First Amendment and fair use.'
                    ],
                    [
                        'text' => 'No, it\'s protected Parody.',
                        'result' => 'Smart move. We avoided a costly legal battle and the "Streisand Effect." We even leaned into the joke on social media and gained fans.'
                    ],
                    [
                        'text' => 'Send a cease and desist.',
                        'result' => 'The comedy show read our cease and desist live on air, mocking us further. It became a PR nightmare.'
                    ],
                    [
                        'text' => 'Copyright strike their video.',
                        'result' => 'Filing a false DMCA claim against fair use parody opened us up to counter-suits and penalties.'
                    ]
                ]
            ],
            [
                'title' => 'Open Source Violation',
                'description' => 'Your team used GPL-licensed open source code in your proprietary, closed-source app.',
                'character' => 'Lead Developer',
                'start_text' => 'I used a really good open-source library to speed up development. It has a GPL license. Is that okay for our closed-source commercial app?',
                'options' => [
                    [
                        'text' => 'Yes, open source means do whatever you want.',
                        'result' => 'Wrong. The GPL is a "copyleft" license. The creators sued us and forced us to either remove the code or make our ENTIRE application open source.'
                    ],
                    [
                        'text' => 'No, we must replace it or open source our app.',
                        'result' => 'Correct! We recognized the GPL requirements, removed the library, and wrote our own alternative, protecting our proprietary IP.'
                    ],
                    [
                        'text' => 'Just don\'t tell anyone we used it.',
                        'result' => 'A security researcher reverse engineered our app, found the GPL code, and publicized it. Our reputation was ruined.'
                    ],
                    [
                        'text' => 'Credit the authors in the app credits.',
                        'result' => 'Crediting the authors does not satisfy the GPL copyleft requirement. We were still legally forced to open source our app.'
                    ]
                ]
            ]
        ];

        foreach ($scenarios as $data) {
            $scenario = Scenario::create([
                'title' => $data['title'],
                'description' => $data['description']
            ]);

            $startNode = ScenarioNode::create([
                'scenario_id' => $scenario->id,
                'character_name' => $data['character'],
                'text' => $data['start_text'],
                'is_end' => false
            ]);

            foreach ($data['options'] as $optData) {
                // Create the result node for this option
                $resultNode = ScenarioNode::create([
                    'scenario_id' => $scenario->id,
                    'character_name' => 'Result',
                    'text' => $optData['result'],
                    'is_end' => true
                ]);

                // Create the option linking start node to result node
                ScenarioOption::create([
                    'scenario_node_id' => $startNode->id,
                    'text' => $optData['text'],
                    'next_node_id' => $resultNode->id
                ]);
            }

            $scenario->first_node_id = $startNode->id;
            $scenario->save();
        }
    }
}
