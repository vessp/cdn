# --------------
# Git Support
# --------------
if [ -f ~/.git-completion.bash ]; then
  source ~/.git-completion.bash
  
  # Add git completion to aliases
  __git_complete g __git_main
  __git_complete gc _git_checkout
fi

# Make sure you actually have those aliases defined, of course.
alias g="git"
alias gc="git checkout"
alias gb="git branch"


# --------------
# Console Style
# --------------
reset=$(tput sgr0)
black=$(tput setaf 0)
red=$(tput setaf 1)
green=$(tput setaf 2)
yellow=$(tput setaf 3)
blue=$(tput setaf 4)
purple=$(tput setaf 5)
turquoice=$(tput setaf 6)
grey=$(tput setaf 7) 

export PS1="\[$turquoice\]\w\[$reset\]\[$purple\] ➢\[$reset\] "


# --------------
# Edit .bash_profile
# --------------
alias aliases="open ~/.bash_profile"
alias profile="open ~/.bash_profile"
alias reload="source ~/.bash_profile"


# --------------
# Apps
# --------------
alias finder="open -a Finder ./"
alias sublime="open -a 'Sublime Text'"
alias sub="open -a 'Sublime Text' ."
alias chrome="open -na 'Google Chrome'"

# alias chromep="open -na 'Google Chrome' --args --disable-web-security --ignore-certificate-errors --user-data-dir='/path/to/anywhere/empty/Chrome Dev'"



# --------------
# Apps
# --------------
alias wacom="open -a WacomTabletDriver" #restart Wacom driver
alias wifi="networksetup -setairportpower en0 off && SLEEP 2 && networksetup -setairportpower en0 on"
alias wifi2="sudo ifconfig en0 down && sudo ifconfig en0 up" #restart wifi

# alias proxyon="sudo networksetup -setsecurewebproxy 'Wi-Fi' '<proxy_host>' <proxy_port>"
# alias proxyoff="sudo networksetup -setsecurewebproxystate 'Wi-Fi' off"

#Arg1 is src folder path
alias jswc='f(){ DIR=${1:-.}; find "$DIR" -name "*.js*" | xargs wc -mlw;  unset -f f; }; f'



# --------------------
# Navigate to location
# --------------------
alias root="cd ~"
alias docs="cd ~/Documents/"
alias downloads="cd ~/Downloads/"
alias desktop="cd ~/Desktop/"



# --------------------
# Path
# --------------------
# export PATH=/path/to/your/desired/folder:$PATH






# MacOS System
alias showhiddenfiles="defaults write com.apple.finder AppleShowAllFiles YES" # requires Finder relaunch
alias hidehiddenfiles="defaults write com.apple.finder AppleShowAllFiles NO" # requires Finder relaunch

# Example exported environment variable
export SOME_SECRET_PASSWORD="password123!asdf"
