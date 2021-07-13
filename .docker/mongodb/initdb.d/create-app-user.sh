mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    db.createUser({
      user: $(_js_escape "$MONGO_APP_USERNAME"),
      pwd: $(_js_escape "$MONGO_APP_PASSWORD"),
      roles: [ { role: "readWrite", db: $(_js_escape "$MONGO_APP_DATABASE") } ]
    });
echo ======================================================
echo created user: $(_js_escape "$MONGO_INITDB_USERNAME") in database $(_js_escape "$MONGO_INITDB_DATABASE")
echo ======================================================


EOF
