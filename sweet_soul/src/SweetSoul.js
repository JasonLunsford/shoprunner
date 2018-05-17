import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';
import Modal from 'react-responsive-modal';

import './SweetSoul.css';

export default class SweetSoul extends Component {
  state = {
    open:       false,
    showButton: true,
    users:      [],
    user:       {},
    shopData:   {},
    activeExp:  {}
  };

  coreGetConfig = {
      method:  'get',
      baseURL: 'http://localhost:8181/analytics'
  };

  componentDidMount() {
    this.getUsers().then(users => {

      let random = this.randomNum(2);
      let user = users[random];

      this.setState({ users, user });
    });

    this.getShop().then(shopData => {
      const random = this.randomNum(1);
      const activeExp = shopData.experiences[random];

      this.setState({ shopData, activeExp });
    });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onSignup = async () => {
    const { user, shopData, activeExp } = this.state;
    const expHandle = activeExp.lookupName;

    let expCounter = _.get(shopData.counter, expHandle);
    let prefCounter = _.get(user.preferredExp.sweetsoul, expHandle);

    _.set(shopData.counter, expHandle, expCounter + 1);
    _.set(user.preferredExp.sweetsoul, expHandle, prefCounter + 1);

    await this.updateUser(user);
    await this.updateShop(shopData);

    this.setState({ user, shopData, showButton: false });
  };

  randomNum(upper) {
    return _.random(0, upper);
  }

  async getUsers() {
    let config = _.assign({}, this.coreGetConfig, {url: 'users/all'});

    let result = await axios(config);

    return result.data.users;
  }

  async getShop() {
    let config = _.assign({}, this.coreGetConfig, {url: 'shops/sweetsoul'});

    let result = await axios(config);

    return result.data.shop[0];
  }

  updateUser(user) {
    let stringData = JSON.stringify(user);
    let userData = `payload=${stringData}`;

    return fetch(`http://localhost:8181/analytics/users/${user.firstName}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: userData
    }).then(res => res.json());
  }

  updateShop(shop) {
    let stringData = JSON.stringify(shop);
    let shopData = `payload=${stringData}`;

    return fetch(`http://localhost:8181/analytics/shops/${shop.lookupName}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: shopData
    }).then(res => res.json());
  }

  render() {
    const { open, shopData, user, showButton, activeExp } = this.state;
    
    const firstName = (
      <span style={{color:user.favColor}}>{_.capitalize(user.firstName)}</span>
    );

    const learnMoreLink = (
      <a onClick={this.onOpenModal}>Learn more!</a>
    );

    const signUpButton = (
      <button className="modal-button"
              onClick={this.onSignup}
              style={{color:activeExp.background, 
                      background:activeExp.foreground}}>Sign Me Up</button>
    );

    const thankYouMsg = (
      <span>Thank You!</span>
    );

    const shopContent = (
      <div>
        <p>The world is full of rotten souls - but now you can join the Revolution.</p>
        <p>Together with ShopRunner, your new shoes will be on your feet in 2 days!</p>
        <p>Bring kindness to the world {firstName} with a sweet sole from {shopData.tradeName}.</p>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header-reverse">
          <h1 className="App-title">Welcome to {shopData.tradeName}</h1>
        </header>
        <section className="App-body">
          <p className="App-message">
            Brought to you by ShopRunner.
          </p>
          <p className="App-hook">
            Interested in shopping with ShopRunner? {learnMoreLink}
          </p>
        </section>
        <Modal open={open} 
               onClose={this.onCloseModal} 
               center 
               classNames={{ modal: 'modal-body' }}
               styles={{ modal: {
                background: activeExp.background,
                borderColor: activeExp.details,
                color: activeExp.text
              }}}>
          <div className="modal-shell">
            <span className="theme-badge" style={{borderBottomColor:activeExp.details}}>{activeExp.name}</span>
            <h2 className="modal-header" style={{color:activeExp.foreground}}>{shopData.tradeName} Is Awesome</h2>
            <p>But ShopRunner makes it special.</p>
            {shopContent}
            { showButton ? signUpButton : thankYouMsg }
          </div>
        </Modal>
      </div>
    );
  }
}
