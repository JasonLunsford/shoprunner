Greetings!

To setup the demonstration please run:

npm install

via a terminal in each of the three main directories (server, sweet_soul, fancy_pants).

Also, please make sure you have a recent version of node installed on your machine. Nodemon is also helpful but not required.

Once installation is complete please keep the terminals open and run:

npm start

FancyPants runs on port 5001
SweetSoul runs on port 5000

To reset the db, please execute this command in a separate tab or via curl:

http://localhost:8181/analytics?prep=true

To access the complete set of users & their current metrics go here:

http://localhost:8181/analytics/users/all

The returned object will contain a small subobject:

    "preferredExp": {
        "fancypants": {
            "exp1": 0,
            "exp2": 0
        },
        "sweetsoul": {
            "exp1": 0,
            "exp2": 0
        }
    }

Watch for these values to increment when the user is randomly selected on shop reload, and the sign up button clicked. Remember experiences are randomly selected too!

To access the complete set of shops & their current meterics go here:

http://localhost:8181/analytics/shops/all

The returned object will contain a small object:

    "counter": {
        "exp1": 0,
        "exp2": 0
    }

Here is where the total number of times each of the two experiences are clicked.

Thank you.
