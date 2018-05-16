import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';
import Modal from 'react-responsive-modal';

import './SweetSoul.css';

export default class SweetSoul extends Component {
  state = {
    open: false,
    users: [],
    user: {},
    color: '',
    companyData: {}
  };

  coreGetConfig = {
      method:  'get',
      baseURL: 'http://localhost:8181/shoprunner',
      timeout: 20000
  };

  componentDidMount() {
    this.getAllUsers().then(result => {
      this.setState({ users: result });
    });

    this.getCompanyData().then(result => {
      this.setState({ companyData: result });
    });
  }

  onOpenModal = () => {
    let user = this.state.users[this.randomNum()];
    let color = `favColor${this.randomNum()}`;

    this.setState({ open: true, user, color });
  };

  onCloseModal = () => {
    this.setState({ open: false, user: {}, color: '' });
  };

  randomNum() {
    return _.random(0, 2);
  }

  async getAllUsers() {
    let config = _.assign({}, this.coreGetConfig, {url: 'users/all'});

    let result = await axios(config);

    return result.data.users;
  }

  async getCompanyData() {
    let config = _.assign({}, this.coreGetConfig, {url: 'shops/sweetsoul'});

    let result = await axios(config);

    return result.data.shop[0];
  }

  render() {
    const { open, companyData, user, color } = this.state;
    const firstName = _.capitalize(user.firstName);
    const favColor = user[color];
    const message = (
      <div>
        <h2>{companyData.tradeName} Is Awesome</h2>
        <p>But ShopRunner makes it special.</p>
        <p>Add stuff about <span style={{color: favColor}}>{firstName}</span>, figure out a way to do more w colors</p>
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
            Interested in shopping with ShopRunner? <a onClick={this.onOpenModal}>Learn more!</a>
          </p>
        </section>
        <Modal open={open} 
               onClose={this.onCloseModal} 
               center 
               classNames={{ modal: 'modal-body' }}>
          {message}
        </Modal>
      </div>
    );
  }
}
