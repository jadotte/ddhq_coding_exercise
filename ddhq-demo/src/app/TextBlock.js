"use client";

import React from "react";

class TextBlock extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      text_input: '',
      image_url: null,
      loading: false,
      err: null
    };
    this.handle_change = this.handle_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
  }
  handle_change(event) {
    this.setState({ text_input: event.target.value });
  }
  async handle_submit() {
    let input = this.state.text_input.trim();
    if (!input) {
      this.setState({ error: "No prompt given."})
      return;
    }
    this.setState({ image_url: null, loading: true, err: null });
    const api_key = "";
    try {
      const response = await fetch("http://127.0.0.1:8000/test", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({text_input: input}),
      });
    const image_blob = await response.blob();
    const img_url = URL.createObjectURL(image_blob);
    this.setState({ image_url: img_url, loading: false})
    } catch (error) {
      console.error("Could not load image")
      this.setState({
        err: "Failed to generate Image",
        loading: false
      })
    }
  }
  render () {
    let {text_input, image_url, loading, err} = this.state;
    return (
    <div className="App-content">
        <textarea
        variant="outlined"
        color = "black"
        value={text_input}
        onChange={this.handle_change}
        placeholder="Input here"
        rows='10'
        style={{
            display: 'block',
            marginBottom: '10px',
            padding: '8px',
            fontSize:'16px',
            maxWidth: '800px',
            width: "100%",
          }}
        />
        <button onClick={this.handle_submit} disabled = {loading}>
        {loading ? "Loading" : "Submit"}
        </button>
        {err && <p>Error</p>}
        {loading && <p> Loading image</p>}
        {image_url && (
        <div>
            <img
            src={image_url}
            alt="Histogram"
            style={{
                maxWidth: '800px',
                display: 'block',
                width: "100%",
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
export default TextBlock;
