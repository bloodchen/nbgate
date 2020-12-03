# NBgate - HTTP gateway for NBdomain Website

[NBdomain](https://nbdomain.com) is the decentrolized blockchain domain system. It's one of the effect to reInvent Internet (Web 3.0).
One of its use case is to build decentrolized blockchain website. **NBgate** is the open source project that display decentrolized blockchain websites defined by NBdomain.


## Main features

1. Support raw text of sub-domain content.

2. Display transaction id of the sub-domain, so users can always verify the content independatly.

3. Support displaying Markdown format of sub-domain content. It uses [markdownd-it](https://github.com/markdown-it/markdown-it) with
[GitHub CSS](https://gist.github.com/tuzz/3331384).

4. All contents are immutiable and retrieved from BSV blockchain.

## How to use?

1. clone the code
2. run `node nb-server.js`
3. open url http://127.0.0.1:3000/md.1010.test/ in browser and you shall be able to see some Markdown content.

You can optionally provide public service to other users.

## List of public NBgate servers
`please append nbdomain url to the end of NBgate server`

* https://nbgate.glitch.me/
* https://api.nbdomain.com/nb/

If you setup a public server, please submit an issue and we will update the list.



