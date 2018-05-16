import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';
import Modal from 'react-responsive-modal';

import './SweetSoul.css';

export default class SweetSoul extends Component {
  state = {
    open:  false,
    users: [],
    user:  {},
    companyData: {},
    activeExp: {},
    counter: 0,
    showButton: true
  };

  coreGetConfig = {
      method:  'get',
      baseURL: 'http://localhost:8181/shoprunner'
  };

  corePostConfig = {
      method:  'post',
      baseURL: 'http://localhost:8181/shoprunner'
  };

  componentDidMount() {
    this.getAllUsers().then(users => {
      this.setState({ users });
    });

    this.getShopData().then(shopData => {
      const random = this.randomNum(1);
      const activeExp = shopData.experiences[random];

      this.setState({ shopData, activeExp });
    });
  }

  onOpenModal = () => {
    let random = this.randomNum(2);
    let user = this.state.users[random];

    this.setState({ open: true, user });
  };

  onCloseModal = () => {
    const expHandle = this.state.activeExp.lookupName;

    let userData = this.state.user;
    let companyData = this.state.companyData;

    companyData.counter[expHandle] = this.state.counter;
    userData.preferredExp[companyData.lookupName][expHandle] = this.state.counter;

    this.updateUser(userData);

    this.setState({ open: false, user: {} });
  };

  onSignupClickCount = () => {
    let counter = this.state.counter + 1;
    this.setState({ counter, showButton: false })
  };

  randomNum(upper) {
    return _.random(0, upper);
  }

  async getAllUsers() {
    let config = _.assign({}, this.coreGetConfig, {url: 'users/all'});

    let result = await axios(config);

    return result.data.users;
  }

  async getShopData() {
    let config = _.assign({}, this.coreGetConfig, {url: 'shops/sweetsoul'});

    let result = await axios(config);

    return result.data.shop[0];
  }

  async updateUser(user) {
    let customConfig = {
      url: `users/${user.firstName}`,
      payload: {
        user
      }
    };

    let config = _.assign({}, this.corePostConfig, customConfig);

    await axios(config);
  }

  async updateShopData(shop) {
    let customConfig = {
      url: `shops/${shop.lookupName}`,
      payload: {
        shop
      }
    };

    let config = _.assign({}, this.corePostConfig, customConfig);

    await axios(config);
  }

  render() {
    const { open, companyData, user, showButton } = this.state;
    const firstName = _.capitalize(user.firstName);

    const learnMoreLink = (
      <a onClick={this.onOpenModal}>Learn more!</a>
    );

    const signUpButton = (
      <button onClick={this.onSignupClickCount}>Sign Me Up!</button>
    );

    const thankYouMsg = (
      <span>Thank You!</span>
    );

    const shopContent = (
      <div>
        <p>The world is full of rotten souls - but now you can join the Revolution.</p>
        <p>Together with ShopRunner, your new shoes will be on your feet in 2 days!</p>
        <p>Bring kindness to the world {firstName} with a sweet sole from {companyData.tradeName}.</p>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header-reverse">
          <h1 className="App-title">Welcome to {companyData.tradeName}</h1>
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
               classNames={{ modal: 'modal-body' }}>
          <div>
            <h2>{companyData.tradeName} Is Awesome</h2>
            <p>But ShopRunner makes it special.</p>
            {shopContent}
            { showButton ? signUpButton : thankYouMsg }
          </div>
        </Modal>
      </div>
    );
  }
}
