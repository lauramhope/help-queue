import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 

    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick}/>
      buttonText = "Return to Ticket List";
    }
    else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }
}

updateTicketElapsedWaitTime = () => {
  const { dispatch } = this.props;
  Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
          addSuffix: true
        });
    const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
  });
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  };
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;

// TicketControl.propTypes = {
//   mainTicketList: PropTypes.object,
//   formVisibleOnPage: PropTypes.bool
// };

// formatDistanceToNow(new Date(), {
//   addSuffix: true
// });

// const mapStateToProps = state => {
//   return {
//     mainTicketList: state.mainTicketList,
//     formVisibleOnPage: state.formVisibleOnPage
//   }
// }

// componentDidMount() {
//   this.waitTimeUpdateTimer = setInterval(() =>
//     this.updateTicketElapsedWaitTime(),
//   1000
//   );
// }

// componentDidUpdate() {
//   console.log("component updated!");
// }


// componentWillUnmount(){
//   console.log("component unmounted!");
//   clearInterval(this.waitTimeUpdateTimer);
// }

// updateTicketElapsedWaitTime = () => {
//   console.log("tick");
// }

// TicketControl = connect(mapStateToProps)(TicketControl);

// export default TicketControl;