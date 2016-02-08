var Member = React.createClass({
	getInitialState: function(){
		return ({
			member: this.props.member,
			showModal: false,
			showMember: true
			
		});
	},

	removeUser: function() {
		var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			clubID:this.props.clubID,
			userID: this.state.member.userID
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.removeMember, requestData)
		.then(function(data){
			console.log("++++++++++++++++++++++",data);
			result=data.response.result;
		
				self.setState({
	
				showMember:false
			});
			
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});

	},


	handleShowModal: function(document){
        this.setState({showModal: true});
        
    },
    
    handleHideModal: function(status){
        this.setState({showModal: false});
    },
	
	render: function () {
	    if(this.state.showMember) {
		    return (
			    
			    <tr>
				    <td><p>{this.state.member.userName}</p></td>
				    <td><p>{this.state.member.designation}</p></td>
				    <td><p>{this.state.member.awards}</p></td>
				    <td onClick={this.handleShowModal}><span className="ride"></span><p>{this.state.member.clubJoined.length}</p></td>
				    <td><a href="#" className="remove" onClick={this.removeUser}></a></td> 
				    {this.state.showModal ? <MembersListingModal handleHideModal={this.handleHideModal} token={this.props.token} userID={this.state.member.userID}/> : null}
			    </tr>
			    
			    
		    )
	    }
	
	}
});
