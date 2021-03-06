# 📈&nbsp; CryptoWatch &nbsp; 💸

_An all in one crypto asset tracking application_
![](https://i.imgur.com/uZDoDwT.png)

### Details

- Cryptowatch was created as an easy intuitive way to track and manage your crypto assets
- No actual money is involved, so you can rest easy knowing your investments are actually held wherever you choose
- Use Cryptowatch as an investment sandbox to test the waters before actually investing
- Track your overall portfolio performance in one single place at the glance of an eye

### Live Link

[Cryptowatch Web App](https://cryptowatch.web.app)

### Usage

- Register an account to keep your portfolio on reoccuring visits
- Search for your invested crypto asset and select it from the list
- Cryptowatch will automagically populate the price from the current day, but if you are adding an investment from a previous date, select that date from the calendar pop up
- Enter the amount of crypto you bought and hit add to portfolio! That investment will now be saved to the portfolio.
- Clicking an investment in the portfolio section will toggle the lot information about that asset.
- To add another lot of the same asset, click the asset in your portfolio first to bring it up in the details section, and then click add another lot!
- Your current total portfolio value as well as the 24hr and overall loss/gain is displayed at the top of the portfolio section.

### Running Locally

- Install Client Dependencies

  - `cd React\ Frontend`
  - `yarn`

- Install Server Dependencies

  - `cd Node\ Server`
  - `npm i`

- Hookup Mongo Instance

  - create `.env.keys` in root of `Node\ Server`
  - Add `MONGODB_URI=<URI>` where `<URI>` is your own mongo URI
  - Add `SESSION_SECRET=CryptowatchToTheMoon`

- Run Everything!
  - Run `yarn start` from `React\ Frontend`
  - Run `npm start` from `Node\ Server`

### Stack

- Created using a modified MERN stack
- MongoDB, Express, React/Redux and NodeJS
- Any additions are welcome via a PR

Alex Montague 2019

### Legacy Pictures

#### The first mockup

![](https://i.imgur.com/tjU9WL3.png)

### First UI rendition

![](https://i.imgur.com/3RwZNlK.gif)

#### Right before the current UI update

![](https://i.imgur.com/1OIO4up.png)

#### Current UI

![](https://i.imgur.com/uZDoDwT.png)
