import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';
import Modal from 'react-responsive-modal';

import './FancyPants.css';

export default class FancyPants extends Component {
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
      baseURL: 'http://localhost:8181/shoprunner',
      timeout: 20000
  };

  componentDidMount() {
    this.getAllUsers().then(users => {
      this.setState({ users });
    });

    this.getCompanyData().then(companyData => {
      const random = this.randomNum(1);
      const activeExp = companyData.experiences[random];

      this.setState({ companyData, activeExp });
    });
  }

  onOpenModal = () => {
    let random = this.randomNum(2);
    let user = this.state.users[random];

    this.setState({ open: true, user });
  };

  onCloseModal = () => {
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

  async getCompanyData() {
    let config = _.assign({}, this.coreGetConfig, {url: 'shops/fancypants'});

    let result = await axios(config);

    return result.data.shop[0];
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
        <p>We at Fancy Pants strive to cloth our customes in nothing but the finest in pants wear.</p>
        <p>Together with ShopRunner, we can now get our award winning articles to your door in 2 days!</p>
        <p>{firstName} what are you waiting for? Join now and save big!</p>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
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
