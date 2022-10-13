# Protoplugin Example

This directory contains an example plugin, which shows how to work with the 
plugin framework as well as a separate app which uses the plugin.

The example directory is split into two subdirectories:

## `protoc-gen-twirp-es`

This directory contains all the code for the plugin.  It generates a [Twirp](https://twitchtv.github.io/twirp/docs/spec_v7.html) client from service definitions in Protobuf files.  The Twirp client uses base types generated from `protobuf-es`.

To build the plugin:

`npm run build`


## `app`

This directory is a separate application which illustrates the usage of the `protoc-gen-twirp-es` plugin.  It generates a client using the above plugin and then builds that into HTML page to show how it interacts with a server.  Note that the server is our demo Connect server, so this can't be completely wire-compatible with Twirp.

To start the app and view the requests:

`npm start`.
