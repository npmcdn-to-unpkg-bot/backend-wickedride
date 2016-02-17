var MembersListing = React.createClass({
	getInitialState: function(){
		return ({
	
            members : [],
            membersAvailable: false
	
		});
	},

	componentWillMount: function(){
		
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			clubID: this.props.clubID
		};
		services.GET(config.url.getClubMembers, requestData)
		.then(function(data){
			
			result=data.response.result;
			if(result.length) {
				self.setState({
				members:data.response.result,
				membersAvailable:true
			});
			}
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
       
	},

	close: function() {
		
		this.props.handleHideUser(false);
       
	},
	
	render: function () {
		var self=this;
		if(this.state.membersAvailable==true) {
		return (
			<td colSpan="5" className="no-Club">
			
				<div className="page-title">
				    <span className="users"></span>
					<h4>Club Members</h4>
					<div className="filter-block" onClick={this.close}>
						<a href="#"></a>
					</div>
				</div>
				<div className="inner-table">
					<table cellSpacing="0"  cellPadding="25">
						<th>User Name</th>
						<th>Designation</th>
						<th>Number of Clubs Joined</th>
						<th>Change Role</th>
						<th></th>
			 
						<tbody>
						{this.state.members.map(function(member){
								return <Member member={member} token={self.props.token} clubID={self.props.clubID} key={member.userID} admin={self.props.admin}/>
							})}
						</tbody>
					</table>
				</div>
				
			</td>		
		)
	    }else {
	    	return(
		    <td colSpan="5" className="no-Club">
				<div className="page-title">
				<span className="users"></span>
					<h4>No club member available.</h4>
					<div className="filter-block" onClick={this.close}>
						<a href="#"></a>
					</div>
				</div>
			</td>)
	    }
	}
	
});