This is a handy bash function you can put in your bash_profile or zshrc. It searches through previous branches you have worked on by piping the response of git branch to grep and searching for param \$1 of function.

From there it displays a list of branch results and gives you the option to checkout whichever one you want using select.

```bash
function fbr(){
    if branch=$(git symbolic-ref --short -q HEAD)
    then
        if [ -z "$1" ]
        then
            echo "Please add a search string"
        else
            result=($(git branch | grep $1))

            if [[ ${#result[@]} > 0 ]]
            then
                echo ${#result[@]} branches found. Select checkout branch:
                select opt in "${result[@]}"
                do
                    if [[ $result[$REPLY] ]]
                    then
                    git checkout $result[$REPLY]
                    break;
                    else
                    echo "Not $REPLY is not an option"
                    fi
                done
            else
                echo "No results found";
            fi
        fi
    else
        echo "Not a branch";
    fi
}

```

Make sure to save your bash_profile with

```bash
source ~/.bash_profile
```

Now if you run:

```bash
fbr (INSERT SEARCH STRING)
```

You can get a list of branch options to checkout that contain your search string. select the branch to checkout by inputting its number in the results

![alt text](https://firebasestorage.googleapis.com/v0/b/bsmithdev-6cad2.appspot.com/o/terminal-result-1.png?alt=media&token=10001db7-7434-4b84-9d1c-0d71cc054f5d)

Thanks for reading, hope this speeds your branch swicthing!
