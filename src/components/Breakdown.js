import React, { Component } from 'react';

class Breakdown extends Component {
    render(){     
        return <div id="breakdown">
           <h3>Breakdown:</h3> 
           {Object.keys(this.props.categories).map(c=><div key={c}>{c}:{this.props.categories[c]}</div>)}

        </div>
    }
}

export default Breakdown