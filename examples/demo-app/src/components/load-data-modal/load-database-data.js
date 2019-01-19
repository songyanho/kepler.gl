// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {CORS_LINK, LOADING_URL_MESSAGE} from '../../constants/default-settings';

const propTypes = {
    onLoadDatabaseData: PropTypes.func.isRequired
};

const StyledDescription = styled.div`
  font-size: 14px;
  color: ${props => props.theme.labelColorLT};
  line-height: 18px;
  margin-bottom: 12px;
`;

const InputForm = styled.div`
  flex-grow: 1;
  padding: 32px;
  background-color: ${props => props.theme.panelBackgroundLT};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.inputPadding};
  color: ${props => props.error ? 'red' : props.theme.titleColorLT};
  height: ${props => props.theme.inputBoxHeight};
  border: 0;
  outline: 0;
  font-size: ${props => props.theme.inputFontSize};
  
  :active,
  :focus,
  &.focus,
  &.active {
    outline: 0;
  }
`;

const StyledFromGroup = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const StyledInputLabel = styled.div`
  font-size: 11px;
  color: ${props => props.theme.textColorLT};
  letter-spacing: 0.2px;
  ul {
    padding-left: 12px;
  }
`;

export const StyledBtn = styled.button`
  background-color: ${props => props.theme.primaryBtnActBgd};
  color: ${props => props.theme.primaryBtnActColor};
`;

export const StyledError = styled.div`
  color: red;
`;

export const StyledErrorDescription = styled.div`
  font-size: 14px;
`;

const Error = ({error, query}) => (
  <StyledError>
    <StyledErrorDescription>{query}</StyledErrorDescription>
    <StyledErrorDescription>{error.message}</StyledErrorDescription>
  </StyledError>
);

const EXTERNAL_DATBASE_API_ENDPOINT = process.env.ExternalDatabaseApiEndpoint || ''; // eslint-disable-line

class LoadDatabaseData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      url: EXTERNAL_DATBASE_API_ENDPOINT
    };
  }
  onQueryChange = (e) => {
    // TODO: validate url
    this.setState({
      query: e.target.value
    });
  };
  onUrlhange = (e) => {
    // TODO: validate url
    this.setState({
      url: e.target.value
    });
  };

  onLoadDatabaseData  = () => {
    const {query, url} = this.state;
    if (!query || !url) {
      return;
    }
    this.props.onLoadDatabaseData({url, query});
  };

  render() {
    return (
      <div>
        <InputForm>
          <StyledDescription>SQL</StyledDescription>
          <StyledInputLabel>
            {LOADING_URL_MESSAGE}
          </StyledInputLabel>
          <StyledInputLabel>
            Examples:
            <ul>
              <li>SELECT * FROM request.request LIMIT 10</li>
            </ul>
          </StyledInputLabel>
          <StyledFromGroup>
            <StyledInput
              onChange={this.onUrlhange}
              type="text"
              placeholder="Database REST API endpoint"
              value={this.state.url}
              error={this.props.error}
            />
          </StyledFromGroup>
          <StyledFromGroup>
            <StyledInput
              onChange={this.onQueryChange}
              type="text"
              placeholder="SQL"
              value={this.state.query}
              error={this.props.error}
            />
            <StyledBtn type="submit" onClick={this.onLoadDatabaseData}>
              Fetch
            </StyledBtn>
          </StyledFromGroup>
          {this.props.error && (<Error error={this.props.error} url={this.props.option.query} />)}
        </InputForm>
      </div>
    );
  }
}

LoadDatabaseData.propTypes = propTypes;

export default LoadDatabaseData;
