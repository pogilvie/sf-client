

creds:
	sf org display -o dev --json > creds.json

# install jsr via bun install -g jsr
# bun init
# subscribe is run just once for the new project
subscribe:
	jsr add @pogilvie/sf