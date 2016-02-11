var AllUrl = {
	pageSize: 5
}

var ClubList = React.createClass({
	getInitialState: function(){
		return ({
			club: {},
			clubMembers: false,
			clubMembersList:[],
			clubDelete: true,
			totalRides: false,
			clubRideList:[],
			showUser: false,
			showRide: false,
			showGallery: false,
			token: this.props.token,
			users:[],
			classUser : "users",
			classRide : "ride",
			classGallery : "gallery",
			disableRide : false,
			date : {},
			time : {}
		});
	},
	componentWillMount: function(){
		
		var dd = new Date(this.props.club.date),
		date = (dd.getMonth() + 1) + '/' + dd.getDate() + '/' +  dd.getFullYear()
        var hours = dd.getHours();
        var minutes = dd.getMinutes();
        var time = hours + ':' + minutes;
               
		this.setState({
			club: this.props.club,
			token: this.props.token,
			date : date,
			time : time
		});
	},

	appendUser: function(){
		if(this.state.classRide=="ride active") {
            this.setState({showUser:false, classUser : "users"});
        }else {
        	this.setState({showUser:true, classUser : "users active"});
        }
	},

	appendRide: function(){
		if(this.state.classUser=="users active") {
            this.setState({showRide:false, classRide : "ride"});
        }else {
        	this.setState({showRide:true, classRide : "ride active"});
        }
	},

	appendGallery: function(){

        this.setState({showGallery:true, classGallery : "gallery active"});
	},

	handleHideUser: function() {
        this.setState({showUser:false, classUser : "users"});
	},

	handleHideRide: function() {
        this.setState({showRide:false, classRide : "ride"});
	},

	handleHideGallery: function() {
        this.setState({showGallery:false, classGallery : "gallery"});
	},

	render: function () {
		var currentThis = this;
		var time = Date.parse(this.props.club.time);
		
		
		
		return (
			<tbody cellSpacing="0" cellPadding="25">
			    <tr>
			        <td><p>{this.props.club.clubName}</p></td>
				    <td><p>{this.props.club.creatorName}</p></td>
				    <td><p>{this.state.date}</p></td>
				    <td><p>{this.state.time}</p></td>
				    <td><p><a onClick={this.appendUser} className={this.state.classUser}></a>{this.props.club.memberCount}</p>
				        <p><a className={this.state.classGallery}></a></p>
				        <p><a onClick={this.appendRide} className={this.state.classRide} disabled={this.state.disableRide}></a></p>
				    </td>
                </tr>
                <tr>
				    
				        {this.state.showUser ? <MembersListing handleHideUser={this.handleHideUser} token={this.props.token} clubID={this.props.club.clubId}/>:null}
				        {this.state.showRide ? <RidesListing handleHideRide={this.handleHideRide} token={this.props.token} clubID={this.props.club.clubId}/>:null}
				        {this.state.showGallery ? <MembersListing handleHideGallery={this.handleHideGallery}/>:null}
				   
				</tr>
			</tbody>
		);
	},
	_onClick: function(event){

		var currentThis = this;
		var data = {}
		data.id = $(event.target).attr("name")
		if($(event.target).attr("name") == "clubDelete"){
			if(confirm("club will detele permanently") == true) {
				this.setState({
					clubDelete: false
				})
			}
		}
		else if($(event.target).attr("name") == "clubMembers"){
			
			if(!this.state.clubMembers){
				var requestData = {}
				requestData.token = this.props.token;
				requestData.clubID = this.props.club.clubId; 
				services.POST(config.url.getClubMembers, requestData)
				.then(function(data){
					currentThis.setState({
						clubMembers: !currentThis.state.clubMembers,
						clubMembersList: data.response,
						totalRides:false
					});
				})
				.catch(function(error){
					console.log("error",error)
				});
			}
			else{
				this.setState({
					clubMembers: !this.state.clubMembers,
					totalRides:false
				});
			}
		}
		else if($(event.target).attr("name") == "totalRides"){
			
			if(!this.state.totalRides){
				var requestData = {}
				requestData.token = this.props.token;
				requestData.clubID = this.props.club.clubId; 
				services.POST(config.url.getClubRides, requestData)
				.then(function(data){
					currentThis.setState({
						clubMembers: false,
						totalRides: true,
						clubRideList:data.response.result
					})
				})
				.catch(function(error){
					console.log("error",error)
				});
			}
			else{
				this.setState({
					clubMembers: false,
					totalRides:false
				});
			}
		}
	}
});
