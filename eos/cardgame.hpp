#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT cardgame : public contract {
    
  private:
  
  enum game_status int8_t {
    ONGOING = 0,
    PLAYER_WON = 1,
    PLAYER_LOST = -1
  };
  
  enum card_type uint8_t {
    EMPTY = 0,
    FIRE = 1,
    WOOD = 2,
    WATER = 3,
    NEUTRAL = 4,
    VOID = 5
  };
  
  struct card {
    uint8_t type;
    uint8_t attack_point;
  };
  
  struct game {
    int8_t player_life = 5;
    int8_t ai_life = 5;
    int8_t status = ONGOING;
  };
  
    TABLE user_info {
      name      username;
      uint64_t  win_count = 0;
      uint64_t  lost_count = 0;
      game      game_data;  
      auto primary_key() const { return username.value; }
    };
    
    typedef multi_index
      <name("users"), user_info> users_table;
    
    users_table _users;
  
  public:
  
    cardgame( name receiver, name code,
      datastream<const char*> ds ) :
      contract(receiver, code, ds),
      _users(receiver, receiver.value)
      {}
    
    ACTION login(name username);
  
};