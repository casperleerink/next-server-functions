# Nextjs App router testing.

This is just a small repository to do some testing with the new Nextjs app router patterns, in particular so setup a easier to use API for handling errors, middleware and revalidation.

- The code relies on unstable Nextjs features, so use it in as many production softwares as you want, idc! 🙃🙃

- Right now, the queries are only available on server components, and the mutation only on client components.

## Getting started.

- Copy over `/lib/next-server-functions` folder to your project.
- Create procedures, see `/lib/api/procedures` for examples. You can think of procedures as different middlewares, where you can handle authorization and errors.
- Create queries by calling the procedures you created. See `/lib/api/queries` for examples.
- Create actions (mutations)
