//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.58;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.58] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x193f56=_0x3273;(function(_0x37b4ab,_0x47c70a){const _0x3bdc16=_0x3273,_0x2c766e=_0x37b4ab();while(!![]){try{const _0x39018a=parseInt(_0x3bdc16(0x2b5))/0x1+-parseInt(_0x3bdc16(0x728))/0x2+-parseInt(_0x3bdc16(0x361))/0x3+-parseInt(_0x3bdc16(0x515))/0x4+-parseInt(_0x3bdc16(0x2ef))/0x5+parseInt(_0x3bdc16(0x32c))/0x6+-parseInt(_0x3bdc16(0x8b2))/0x7*(-parseInt(_0x3bdc16(0x884))/0x8);if(_0x39018a===_0x47c70a)break;else _0x2c766e['push'](_0x2c766e['shift']());}catch(_0x34d87d){_0x2c766e['push'](_0x2c766e['shift']());}}}(_0xc32b,0x23f77));var label=_0x193f56(0x818),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1df53a){const _0x2149a8=_0x193f56;return _0x1df53a[_0x2149a8(0x849)]&&_0x1df53a['description'][_0x2149a8(0x267)]('['+label+']');})[0x0];VisuMZ[label][_0x193f56(0x7fe)]=VisuMZ[label][_0x193f56(0x7fe)]||{},VisuMZ[_0x193f56(0x7d0)]=function(_0x53865f,_0x1031a7){const _0x269c0c=_0x193f56;for(const _0x35fa60 in _0x1031a7){if(_0x269c0c(0x714)!==_0x269c0c(0x714))_0x2fff10[_0x269c0c(0x818)][_0x269c0c(0x863)][_0x269c0c(0x865)](this),this[_0x269c0c(0x738)]();else{if(_0x35fa60[_0x269c0c(0x3d7)](/(.*):(.*)/i)){if(_0x269c0c(0x749)!==_0x269c0c(0x77b)){const _0x583dbd=String(RegExp['$1']),_0x2c5861=String(RegExp['$2'])[_0x269c0c(0x125)]()[_0x269c0c(0x4f6)]();let _0x35ab79,_0x10a2eb,_0x148c4b;switch(_0x2c5861){case _0x269c0c(0x7a7):_0x35ab79=_0x1031a7[_0x35fa60]!==''?Number(_0x1031a7[_0x35fa60]):0x0;break;case'ARRAYNUM':_0x10a2eb=_0x1031a7[_0x35fa60]!==''?JSON['parse'](_0x1031a7[_0x35fa60]):[],_0x35ab79=_0x10a2eb[_0x269c0c(0x8e0)](_0x3f3ad2=>Number(_0x3f3ad2));break;case _0x269c0c(0x699):_0x35ab79=_0x1031a7[_0x35fa60]!==''?eval(_0x1031a7[_0x35fa60]):null;break;case _0x269c0c(0x138):_0x10a2eb=_0x1031a7[_0x35fa60]!==''?JSON['parse'](_0x1031a7[_0x35fa60]):[],_0x35ab79=_0x10a2eb[_0x269c0c(0x8e0)](_0x1f1027=>eval(_0x1f1027));break;case'JSON':_0x35ab79=_0x1031a7[_0x35fa60]!==''?JSON[_0x269c0c(0x503)](_0x1031a7[_0x35fa60]):'';break;case'ARRAYJSON':_0x10a2eb=_0x1031a7[_0x35fa60]!==''?JSON['parse'](_0x1031a7[_0x35fa60]):[],_0x35ab79=_0x10a2eb['map'](_0x5af247=>JSON[_0x269c0c(0x503)](_0x5af247));break;case'FUNC':_0x35ab79=_0x1031a7[_0x35fa60]!==''?new Function(JSON[_0x269c0c(0x503)](_0x1031a7[_0x35fa60])):new Function(_0x269c0c(0x3a1));break;case _0x269c0c(0x64d):_0x10a2eb=_0x1031a7[_0x35fa60]!==''?JSON[_0x269c0c(0x503)](_0x1031a7[_0x35fa60]):[],_0x35ab79=_0x10a2eb[_0x269c0c(0x8e0)](_0x56c4d1=>new Function(JSON['parse'](_0x56c4d1)));break;case _0x269c0c(0x209):_0x35ab79=_0x1031a7[_0x35fa60]!==''?String(_0x1031a7[_0x35fa60]):'';break;case _0x269c0c(0x1b2):_0x10a2eb=_0x1031a7[_0x35fa60]!==''?JSON[_0x269c0c(0x503)](_0x1031a7[_0x35fa60]):[],_0x35ab79=_0x10a2eb[_0x269c0c(0x8e0)](_0x515709=>String(_0x515709));break;case _0x269c0c(0x37c):_0x148c4b=_0x1031a7[_0x35fa60]!==''?JSON[_0x269c0c(0x503)](_0x1031a7[_0x35fa60]):{},_0x53865f[_0x583dbd]={},VisuMZ[_0x269c0c(0x7d0)](_0x53865f[_0x583dbd],_0x148c4b);continue;case _0x269c0c(0x123):_0x10a2eb=_0x1031a7[_0x35fa60]!==''?JSON[_0x269c0c(0x503)](_0x1031a7[_0x35fa60]):[],_0x35ab79=_0x10a2eb[_0x269c0c(0x8e0)](_0x4c50a6=>VisuMZ[_0x269c0c(0x7d0)]({},JSON[_0x269c0c(0x503)](_0x4c50a6)));break;default:continue;}_0x53865f[_0x583dbd]=_0x35ab79;}else this[_0x269c0c(0x7cc)](0x4b0,0x0,0x78);}}}return _0x53865f;},(_0x366011=>{const _0x37f91b=_0x193f56,_0x545de9=_0x366011[_0x37f91b(0x41f)];for(const _0x56c19e of dependencies){if('NLStb'===_0x37f91b(0x63e))return this[_0x37f91b(0x504)]()?this[_0x37f91b(0x5d6)]():0x0;else{if(!Imported[_0x56c19e]){if(_0x37f91b(0x4a2)===_0x37f91b(0x36e))this[_0x37f91b(0x65f)]=_0x37f91b(0x752);else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x37f91b(0x627)](_0x545de9,_0x56c19e)),SceneManager[_0x37f91b(0x6c0)]();break;}}}}const _0x1096bf=_0x366011[_0x37f91b(0x35f)];if(_0x1096bf[_0x37f91b(0x3d7)](/\[Version[ ](.*?)\]/i)){if(_0x37f91b(0x549)===_0x37f91b(0x4ab)){if(_0x4de8b5[_0x3d7799][_0x37f91b(0x2e3)])return!![];}else{const _0x1038dc=Number(RegExp['$1']);_0x1038dc!==VisuMZ[label][_0x37f91b(0x580)]&&(_0x37f91b(0x575)!==_0x37f91b(0x575)?(_0x400185+=_0x87b8a2+'\x0a',_0x24e9ea+=_0x37f91b(0x8c2)):(alert(_0x37f91b(0x3d0)[_0x37f91b(0x627)](_0x545de9,_0x1038dc)),SceneManager[_0x37f91b(0x6c0)]()));}}if(_0x1096bf[_0x37f91b(0x3d7)](/\[Tier[ ](\d+)\]/i)){if('DriSi'!==_0x37f91b(0x265)){const _0x574af3=Number(RegExp['$1']);_0x574af3<tier?(alert(_0x37f91b(0x6cc)[_0x37f91b(0x627)](_0x545de9,_0x574af3,tier)),SceneManager[_0x37f91b(0x6c0)]()):tier=Math['max'](_0x574af3,tier);}else this['_backSprite1']=new _0x52b751(_0x4a6d6a[_0x37f91b(0x6bc)](_0x4acd80[_0x37f91b(0x351)])),this[_0x37f91b(0x47a)]=new _0x431b3d(_0x30a0bd[_0x37f91b(0x8eb)](_0x1fd57b[_0x37f91b(0x555)])),this[_0x37f91b(0x6a3)](this[_0x37f91b(0x55d)]),this[_0x37f91b(0x6a3)](this[_0x37f91b(0x47a)]),this[_0x37f91b(0x55d)][_0x37f91b(0x481)][_0x37f91b(0x893)](this[_0x37f91b(0x73b)][_0x37f91b(0x65c)](this,this[_0x37f91b(0x55d)])),this[_0x37f91b(0x47a)][_0x37f91b(0x481)][_0x37f91b(0x893)](this[_0x37f91b(0x73b)]['bind'](this,this[_0x37f91b(0x47a)]));}VisuMZ[_0x37f91b(0x7d0)](VisuMZ[label][_0x37f91b(0x7fe)],_0x366011[_0x37f91b(0x65a)]);})(pluginData),((()=>{const _0x5f1016=_0x193f56;if(VisuMZ[_0x5f1016(0x818)][_0x5f1016(0x7fe)][_0x5f1016(0x168)][_0x5f1016(0x385)]??!![]){if(_0x5f1016(0x21d)!==_0x5f1016(0x21d)){if(this[_0x5f1016(0x6c2)]())return 0x1;const _0x1f0527=this[_0x5f1016(0x35d)]()-this[_0x5f1016(0x1fc)](),_0x114f82=this['currentExp']()-this[_0x5f1016(0x1fc)]();return(_0x114f82/_0x1f0527)[_0x5f1016(0x12f)](0x0,0x1);}else for(const _0x5c6e1a in $plugins){const _0x51b603=$plugins[_0x5c6e1a];_0x51b603[_0x5f1016(0x41f)]['match'](/(.*)\/(.*)/i)&&('iGBTN'==='iGBTN'?_0x51b603[_0x5f1016(0x41f)]=String(RegExp['$2'][_0x5f1016(0x4f6)]()):(this[_0x5f1016(0x7c3)]=[],this[_0x5f1016(0x50d)]=[],this[_0x5f1016(0x1c8)]=this['scale']['x'],this[_0x5f1016(0x6a8)]=this['scale']['y']));}}})()),PluginManager['registerCommand'](pluginData[_0x193f56(0x41f)],_0x193f56(0x632),_0x14b1ad=>{const _0x1c178b=_0x193f56;if(!SceneManager[_0x1c178b(0x87f)])return;if(!SceneManager[_0x1c178b(0x87f)][_0x1c178b(0x3f1)])return;VisuMZ[_0x1c178b(0x7d0)](_0x14b1ad,_0x14b1ad);const _0x177079=Math['round'](_0x14b1ad['pointX']),_0x4715f7=Math[_0x1c178b(0x44b)](_0x14b1ad[_0x1c178b(0x680)]);$gameTemp[_0x1c178b(0x68f)](_0x177079,_0x4715f7,_0x14b1ad[_0x1c178b(0x1c1)],_0x14b1ad['Mirror'],_0x14b1ad[_0x1c178b(0x8c5)]);}),PluginManager[_0x193f56(0x395)](pluginData['name'],_0x193f56(0x620),_0x1f533d=>{const _0x54226c=_0x193f56;if(!$gameTemp[_0x54226c(0x450)]())return;if(!Utils[_0x54226c(0x615)]())return;SceneManager['_scene'][_0x54226c(0x183)]=![],VisuMZ[_0x54226c(0x818)][_0x54226c(0x5b6)]();}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],'ExportAllTroopText',_0x4c72ff=>{const _0x51edc7=_0x193f56;if(!$gameTemp[_0x51edc7(0x450)]())return;if(!Utils[_0x51edc7(0x615)]())return;SceneManager['_scene'][_0x51edc7(0x183)]=![],VisuMZ['CoreEngine'][_0x51edc7(0x846)]();}),PluginManager['registerCommand'](pluginData[_0x193f56(0x41f)],_0x193f56(0x187),_0x5713c3=>{const _0x1c6d59=_0x193f56;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x1c6d59(0x110)]()<=0x0)return;VisuMZ['ConvertParams'](_0x5713c3,_0x5713c3);const _0x53bb57=_0x1c6d59(0x446)['format']($gameMap[_0x1c6d59(0x110)]()[_0x1c6d59(0x701)](0x3)),_0x1b16a4=VisuMZ[_0x1c6d59(0x818)][_0x1c6d59(0x1c3)]($gameMap[_0x1c6d59(0x110)]());VisuMZ[_0x1c6d59(0x818)][_0x1c6d59(0x253)](_0x1b16a4,_0x53bb57,!![]);}),PluginManager[_0x193f56(0x395)](pluginData['name'],_0x193f56(0x10b),_0x150111=>{const _0x26cb26=_0x193f56;if(!$gameTemp[_0x26cb26(0x450)]())return;if(!Utils[_0x26cb26(0x615)]())return;if(!$gameParty[_0x26cb26(0x6d7)]())return;VisuMZ[_0x26cb26(0x7d0)](_0x150111,_0x150111);const _0x4cd327=_0x26cb26(0x26c)['format']($gameTroop[_0x26cb26(0x563)][_0x26cb26(0x701)](0x4)),_0x53e948=VisuMZ['CoreEngine'][_0x26cb26(0x3d6)]($gameTroop[_0x26cb26(0x563)]);VisuMZ['CoreEngine'][_0x26cb26(0x253)](_0x53e948,_0x4cd327,!![]);}),VisuMZ[_0x193f56(0x818)][_0x193f56(0x253)]=function(_0x318886,_0x5c4323,_0xa1fede){const _0x1bcf51=_0x193f56,_0x2feeec=require('fs');let _0x4b9449=_0x1bcf51(0x2bc)[_0x1bcf51(0x627)](_0x5c4323||'0');_0x2feeec[_0x1bcf51(0x376)](_0x4b9449,_0x318886,_0xda9ea1=>{const _0x14de92=_0x1bcf51;if(_0xda9ea1){if('Povrq'==='NHhXE'){const _0x37d216=this['rightArrowWidth']();this[_0x14de92(0x467)](_0x338d71[_0x14de92(0x4bd)]());const _0x13faef=_0x3e2b68['CoreEngine']['Settings']['UI'][_0x14de92(0x5f4)];this[_0x14de92(0x84f)](_0x13faef,_0x526b0b,_0x170610,_0x37d216,_0x14de92(0x6aa));}else throw err;}else{if(_0xa1fede){if(_0x14de92(0x6a4)!==_0x14de92(0x6a4)){const _0x30d175=_0x14de92(0x576);this[_0x14de92(0x406)]=this[_0x14de92(0x406)]||{};if(this[_0x14de92(0x406)][_0x30d175])return this['_colorCache'][_0x30d175];const _0x5d7b37=_0x51e527['CoreEngine'][_0x14de92(0x7fe)][_0x14de92(0x702)][_0x14de92(0x6dc)];return this[_0x14de92(0x860)](_0x30d175,_0x5d7b37);}else alert(_0x14de92(0x433)[_0x14de92(0x627)](_0x4b9449));}}});},VisuMZ['CoreEngine'][_0x193f56(0x5b6)]=function(){const _0x3eb80f=_0x193f56,_0x474d6b=[];for(const _0x16de4e of $dataMapInfos){if(!_0x16de4e)continue;_0x474d6b[_0x3eb80f(0x8a7)](_0x16de4e['id']);}const _0x190c60=_0x474d6b[_0x3eb80f(0x8f1)]*0x64+Math[_0x3eb80f(0x528)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x3eb80f(0x627)](_0x190c60)),this[_0x3eb80f(0x7ec)]=[],this[_0x3eb80f(0x60a)]=$dataMap;for(const _0x40c9a4 of _0x474d6b){_0x3eb80f(0x810)===_0x3eb80f(0x223)?(this[_0x3eb80f(0x6ed)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x3eb80f(0x818)]['loadMapData'](_0x40c9a4);}setTimeout(VisuMZ['CoreEngine'][_0x3eb80f(0x782)]['bind'](this),_0x190c60);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x3af)]=function(_0x59a265){const _0x8d48ed=_0x193f56,_0x5a26b1=_0x8d48ed(0x6a5)[_0x8d48ed(0x627)](_0x59a265[_0x8d48ed(0x701)](0x3)),_0x140c2e=new XMLHttpRequest(),_0x704eb1=_0x8d48ed(0x5bc)+_0x5a26b1;_0x140c2e['open'](_0x8d48ed(0x624),_0x704eb1),_0x140c2e[_0x8d48ed(0x3c6)](_0x8d48ed(0x597)),_0x140c2e[_0x8d48ed(0x5e7)]=()=>this['storeMapData'](_0x140c2e,_0x59a265,_0x5a26b1,_0x704eb1),_0x140c2e[_0x8d48ed(0x851)]=()=>DataManager['onXhrError']('$dataMap',_0x5a26b1,_0x704eb1),_0x140c2e['send']();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x7a6)]=function(_0x305d86,_0x52e93d,_0x373071,_0xdad5da){const _0x549342=_0x193f56;$dataMap=JSON[_0x549342(0x503)](_0x305d86[_0x549342(0x50f)]),DataManager['onLoad']($dataMap),this[_0x549342(0x7ec)][_0x52e93d]=VisuMZ[_0x549342(0x818)][_0x549342(0x1c3)](_0x52e93d),$dataMap=this[_0x549342(0x60a)];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x782)]=function(){const _0x5abb23=_0x193f56,_0x487127=_0x5abb23(0x1e3);this[_0x5abb23(0x7ec)]['remove'](undefined)[_0x5abb23(0x195)]('')[_0x5abb23(0x195)](null);const _0x3d3070=this[_0x5abb23(0x7ec)][_0x5abb23(0x4e1)](_0x5abb23(0x178))[_0x5abb23(0x4f6)]();VisuMZ[_0x5abb23(0x818)][_0x5abb23(0x253)](_0x3d3070,_0x487127,!![]),SceneManager[_0x5abb23(0x87f)][_0x5abb23(0x183)]=!![];},VisuMZ[_0x193f56(0x818)]['ExtractStrFromMap']=function(_0x4a588b){const _0x4dfc94=_0x193f56;if(!$dataMap)return'';let _0x4aa6d3='█'[_0x4dfc94(0x5b1)](0x46)+'\x0a\x0a',_0x554d9a='═'[_0x4dfc94(0x5b1)](0x46)+'\x0a\x0a',_0x21af5a='';this[_0x4dfc94(0x101)]=0x0;for(const _0x195a16 of $dataMap[_0x4dfc94(0x20c)]){if(!_0x195a16)continue;let _0x2ebc3f=_0x195a16['id'],_0x23bd5f=_0x195a16[_0x4dfc94(0x41f)],_0x228440=_0x195a16[_0x4dfc94(0x862)];for(const _0x2d0609 of _0x228440){if(_0x4dfc94(0x623)!==_0x4dfc94(0x623))return _0x512c97[_0x4dfc94(0x818)][_0x4dfc94(0x7fe)]['Window'][_0x4dfc94(0x1ab)];else{const _0x283e26=_0x228440['indexOf'](_0x2d0609)+0x1;let _0x1701b1=_0x554d9a+_0x4dfc94(0x49e),_0x325d59=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x2d0609[_0x4dfc94(0x440)]);if(_0x325d59['length']>0x0){if(_0x21af5a[_0x4dfc94(0x8f1)]>0x0)_0x4dfc94(0x80f)===_0x4dfc94(0x80f)?_0x21af5a+=_0x554d9a+_0x4dfc94(0x178):_0x52e135=_0x3f7427[_0x4dfc94(0x164)](_0x4d568b);else{const _0x262342=$dataMapInfos[_0x4a588b][_0x4dfc94(0x41f)];_0x21af5a+=_0x4aa6d3+_0x4dfc94(0x6ac)[_0x4dfc94(0x627)](_0x4a588b,_0x262342||_0x4dfc94(0x469))+_0x4aa6d3;}_0x21af5a+=_0x1701b1[_0x4dfc94(0x627)](_0x2ebc3f,_0x23bd5f,_0x283e26,_0x325d59);}}}}return _0x21af5a[_0x4dfc94(0x8f1)]>0x0&&(_0x21af5a+=_0x554d9a),_0x21af5a;},VisuMZ['CoreEngine'][_0x193f56(0x846)]=function(){const _0x5432b9=_0x193f56,_0x37ca12=$dataTroops[_0x5432b9(0x8f1)]*0xa+Math['randomInt'](0xa);alert(_0x5432b9(0x8f7)[_0x5432b9(0x627)](_0x37ca12));const _0x5a49c8=[];for(const _0x3e3b9b of $dataTroops){if(!_0x3e3b9b)continue;const _0x452208=_0x3e3b9b['id'];_0x5a49c8[_0x452208]=VisuMZ[_0x5432b9(0x818)][_0x5432b9(0x3d6)](_0x452208);}setTimeout(VisuMZ[_0x5432b9(0x818)][_0x5432b9(0x117)][_0x5432b9(0x65c)](this,_0x5a49c8),_0x37ca12);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x3d6)]=function(_0x4f788f){const _0x24d52e=_0x193f56;if(!$dataTroops[_0x4f788f])return'';let _0x56a94b='█'['repeat'](0x46)+'\x0a\x0a',_0x263911='═'[_0x24d52e(0x5b1)](0x46)+'\x0a\x0a',_0x477738='';this[_0x24d52e(0x101)]=0x0;const _0x4426b3=$dataTroops[_0x4f788f];let _0x16683f=_0x4426b3['pages'];for(const _0x28e63c of _0x16683f){if('IyuOe'!=='IyuOe')return _0x34eefe[_0x24d52e(0x818)]['Settings'][_0x24d52e(0x899)]['EnableMasking'];else{const _0x3b3fb3=_0x16683f[_0x24d52e(0x736)](_0x28e63c)+0x1;let _0x41f808=_0x263911+_0x24d52e(0x344),_0x4557b4=VisuMZ[_0x24d52e(0x818)]['ExtractStrFromList'](_0x28e63c[_0x24d52e(0x440)]);if(_0x4557b4[_0x24d52e(0x8f1)]>0x0){if(_0x477738[_0x24d52e(0x8f1)]>0x0)_0x477738+=_0x263911+_0x24d52e(0x178);else{if(_0x24d52e(0x15e)===_0x24d52e(0x15e))_0x477738+=_0x56a94b+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x4f788f,_0x4426b3[_0x24d52e(0x41f)]||_0x24d52e(0x469))+_0x56a94b;else return _0x4e5d4a[_0x24d52e(0x2b6)](_0x24d52e(0x617));}_0x477738+=_0x41f808['format'](_0x3b3fb3,_0x4557b4);}}}return _0x477738[_0x24d52e(0x8f1)]>0x0&&(_0x477738+=_0x263911),_0x477738;},VisuMZ[_0x193f56(0x818)]['exportAllTroopStrings']=function(_0x196326){const _0x113e31=_0x193f56,_0x315981=_0x113e31(0x447);_0x196326[_0x113e31(0x195)](undefined)[_0x113e31(0x195)]('')['remove'](null);const _0x2cbbb9=_0x196326[_0x113e31(0x4e1)]('\x0a\x0a\x0a\x0a\x0a')[_0x113e31(0x4f6)]();VisuMZ[_0x113e31(0x818)][_0x113e31(0x253)](_0x2cbbb9,_0x315981,!![]),SceneManager[_0x113e31(0x87f)][_0x113e31(0x183)]=!![];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x572)]=function(_0x4193b4){const _0x3c4e21=_0x193f56;let _0x20f3e8='\x0a'+'─'[_0x3c4e21(0x5b1)](0x46)+'\x0a',_0x46966b='\x0a'+'┄'[_0x3c4e21(0x5b1)](0x46)+'\x0a',_0x35f074='';for(const _0x4bdb4c of _0x4193b4){if('senVO'!==_0x3c4e21(0x87c))return 0x0;else{if(!_0x4bdb4c)continue;if(_0x4bdb4c[_0x3c4e21(0x425)]===0x65){_0x35f074+=_0x20f3e8+'\x0a',_0x35f074+=_0x3c4e21(0x408);if(_0x4bdb4c[_0x3c4e21(0x65a)][0x4]!==''&&_0x4bdb4c[_0x3c4e21(0x65a)][0x4]!==undefined){if(_0x3c4e21(0x2f8)!=='rvors')_0x35f074+='【%1】\x0a'[_0x3c4e21(0x627)](_0x4bdb4c[_0x3c4e21(0x65a)][0x4]);else return _0x52f6c3&&_0x26675d[_0x3c4e21(0x87f)]?_0xabae0f[_0x3c4e21(0x87f)][_0x3c4e21(0x40d)]():!![];}}else{if(_0x4bdb4c[_0x3c4e21(0x425)]===0x191)'YgaKt'===_0x3c4e21(0x77a)?_0x35f074+='%1\x0a'[_0x3c4e21(0x627)](_0x4bdb4c[_0x3c4e21(0x65a)][0x0]):(_0x148a9f[_0x3c4e21(0x415)][_0x3c4e21(0x4f0)][_0x3c4e21(0x865)](this),this[_0x3c4e21(0x27e)]());else{if(_0x4bdb4c[_0x3c4e21(0x425)]===0x192)_0x35f074+=_0x20f3e8,_0x35f074+='%1〘Choice\x20%2〙\x20%3%1'[_0x3c4e21(0x627)](_0x46966b,_0x4bdb4c[_0x3c4e21(0x65a)][0x0]+0x1,_0x4bdb4c['parameters'][0x1]);else{if(_0x4bdb4c['code']===0x193)_0x35f074+=_0x20f3e8,_0x35f074+=_0x3c4e21(0x6ad)[_0x3c4e21(0x627)](_0x46966b);else{if(_0x4bdb4c['code']===0x194)_0x35f074+=_0x20f3e8,_0x35f074+=_0x3c4e21(0x866)[_0x3c4e21(0x627)](_0x46966b);else{if(_0x4bdb4c[_0x3c4e21(0x425)]===0x69)_0x35f074+=_0x20f3e8+'\x0a',_0x35f074+=_0x3c4e21(0x8c2);else{if(_0x4bdb4c[_0x3c4e21(0x425)]===0x6c)_0x35f074+=_0x20f3e8+'\x0a',_0x35f074+='》Comment《\x0a%1\x0a'[_0x3c4e21(0x627)](_0x4bdb4c[_0x3c4e21(0x65a)][0x0]);else{if(_0x4bdb4c['code']===0x198)_0x35f074+=_0x3c4e21(0x6a6)['format'](_0x4bdb4c[_0x3c4e21(0x65a)][0x0]);else{if(_0x4bdb4c[_0x3c4e21(0x425)]===0x75){const _0x2cc8f2=$dataCommonEvents[_0x4bdb4c[_0x3c4e21(0x65a)][0x0]];if(_0x2cc8f2&&this[_0x3c4e21(0x101)]<=0xa){if(_0x3c4e21(0x169)!==_0x3c4e21(0x169)){const _0x425b73=['animations',_0x3c4e21(0x3e7),_0x3c4e21(0x16c),_0x3c4e21(0x16f),_0x3c4e21(0x5c8),'faces',_0x3c4e21(0x609),_0x3c4e21(0x139),_0x3c4e21(0x33d),_0x3c4e21(0x8b5),_0x3c4e21(0x8bc),_0x3c4e21(0x562),'titles1',_0x3c4e21(0x36f)];for(const _0x1b3c8f of _0x425b73){const _0x3718ff=_0x4c124c['CoreEngine'][_0x3c4e21(0x7fe)][_0x3c4e21(0x814)][_0x1b3c8f],_0x3941da=_0x3c4e21(0x492)[_0x3c4e21(0x627)](_0x1b3c8f);for(const _0x4c4518 of _0x3718ff){_0x4eb34d[_0x3c4e21(0x87b)](_0x3941da,_0x4c4518);}}}else{this[_0x3c4e21(0x101)]++;let _0x32b7a8=VisuMZ['CoreEngine'][_0x3c4e21(0x572)](_0x2cc8f2[_0x3c4e21(0x440)]);_0x32b7a8[_0x3c4e21(0x8f1)]>0x0&&(_0x35f074+=_0x20f3e8,_0x35f074+=_0x46966b,_0x35f074+=_0x3c4e21(0x7bd)['format'](_0x2cc8f2['id'],_0x2cc8f2[_0x3c4e21(0x41f)]),_0x35f074+=_0x46966b,_0x35f074+=_0x32b7a8,_0x35f074+=_0x46966b,_0x35f074+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x3c4e21(0x627)](_0x2cc8f2['id'],_0x2cc8f2[_0x3c4e21(0x41f)]),_0x35f074+=_0x46966b),this[_0x3c4e21(0x101)]--;}}}}}}}}}}}}}return _0x35f074[_0x3c4e21(0x8f1)]>0x0&&(_0x35f074+=_0x20f3e8),_0x35f074;},PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x237),_0x324476=>{const _0x5e8033=_0x193f56;VisuMZ[_0x5e8033(0x7d0)](_0x324476,_0x324476);const _0x3ad695=_0x324476[_0x5e8033(0x121)];VisuMZ['openURL'](_0x3ad695);}),PluginManager[_0x193f56(0x395)](pluginData['name'],_0x193f56(0x23f),_0x1f10ac=>{const _0x297cc1=_0x193f56;VisuMZ[_0x297cc1(0x7d0)](_0x1f10ac,_0x1f10ac);const _0x23cc51=_0x1f10ac['value']||0x0;$gameParty[_0x297cc1(0x11d)](_0x23cc51);}),PluginManager['registerCommand'](pluginData[_0x193f56(0x41f)],_0x193f56(0x75b),_0x294585=>{const _0x74821e=_0x193f56;if(!SceneManager[_0x74821e(0x637)]())return;VisuMZ['ConvertParams'](_0x294585,_0x294585);const _0xef0afc=_0x294585[_0x74821e(0x59e)];SceneManager[_0x74821e(0x87f)][_0x74821e(0x645)](_0xef0afc);}),PluginManager['registerCommand'](pluginData[_0x193f56(0x41f)],'PictureCoordinatesMode',_0x21993a=>{const _0x2d01ee=_0x193f56;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x2d01ee(0x615)]())return;VisuMZ[_0x2d01ee(0x7d0)](_0x21993a,_0x21993a);const _0x2b6923=_0x21993a['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0x2b6923;}),PluginManager[_0x193f56(0x395)](pluginData['name'],_0x193f56(0x55c),_0x137cbd=>{const _0x504f68=_0x193f56;VisuMZ['ConvertParams'](_0x137cbd,_0x137cbd);const _0x4235df=_0x137cbd[_0x504f68(0x63d)]||0x1,_0x2b9add=_0x137cbd[_0x504f68(0x6c3)]||_0x504f68(0x6b7),_0x557172=$gameScreen[_0x504f68(0x6f5)](_0x4235df);_0x557172&&_0x557172[_0x504f68(0x868)](_0x2b9add);}),PluginManager[_0x193f56(0x395)](pluginData['name'],_0x193f56(0x184),_0x410934=>{const _0x4a0004=_0x193f56;for(let _0x122983=0x1;_0x122983<=0x64;_0x122983++){$gameScreen[_0x4a0004(0x6c1)](_0x122983);}}),PluginManager['registerCommand'](pluginData[_0x193f56(0x41f)],_0x193f56(0x3d4),_0x4eda92=>{const _0x5154a2=_0x193f56;VisuMZ['ConvertParams'](_0x4eda92,_0x4eda92);const _0x571c17=Math[_0x5154a2(0x222)](_0x4eda92[_0x5154a2(0x813)],_0x4eda92[_0x5154a2(0x650)]),_0x490845=Math[_0x5154a2(0x347)](_0x4eda92['StartID'],_0x4eda92[_0x5154a2(0x650)]);for(let _0x296f49=_0x571c17;_0x296f49<=_0x490845;_0x296f49++){$gameScreen[_0x5154a2(0x6c1)](_0x296f49);}}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x177),_0x39d2ff=>{const _0x4e90ac=_0x193f56;VisuMZ[_0x4e90ac(0x7d0)](_0x39d2ff,_0x39d2ff);const _0x2c05c6=Math[_0x4e90ac(0x44b)](_0x39d2ff[_0x4e90ac(0x2c7)])[_0x4e90ac(0x12f)](0x1,0x64),_0x474a7b=_0x39d2ff[_0x4e90ac(0x7fe)],_0x17e22=_0x474a7b[_0x4e90ac(0x4cf)]['clamp'](0x0,0x1),_0x30dff5=Math[_0x4e90ac(0x44b)](_0x474a7b[_0x4e90ac(0x407)]||0x0),_0x599975=Math[_0x4e90ac(0x44b)](_0x474a7b['PositionY']||0x0),_0x18cfea=Math[_0x4e90ac(0x44b)](_0x474a7b[_0x4e90ac(0x69a)]||0x0),_0x53e766=Math['round'](_0x474a7b['ScaleY']||0x0),_0x5482b0=Math[_0x4e90ac(0x44b)](_0x474a7b[_0x4e90ac(0x626)])['clamp'](0x0,0xff),_0x5703a6=_0x474a7b['BlendMode'],_0x3c28c4=_0x4e90ac(0x833),_0x257d81=_0x39d2ff[_0x4e90ac(0x208)]?_0x4e90ac(0x208):_0x4e90ac(0x161),_0x132f2e=_0x3c28c4[_0x4e90ac(0x627)](_0x39d2ff['IconIndex'],_0x257d81);$gameScreen[_0x4e90ac(0x5c7)](_0x2c05c6,_0x132f2e,_0x17e22,_0x30dff5,_0x599975,_0x18cfea,_0x53e766,_0x5482b0,_0x5703a6);}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x855),_0x50b288=>{const _0x1269ef=_0x193f56;VisuMZ[_0x1269ef(0x7d0)](_0x50b288,_0x50b288);const _0x4a4c33=_0x50b288[_0x1269ef(0x404)]||'random',_0x35ce73=_0x50b288[_0x1269ef(0x2fb)]['clamp'](0x1,0x9),_0x4a07d8=_0x50b288[_0x1269ef(0x2e5)][_0x1269ef(0x12f)](0x1,0x9),_0x367a77=_0x50b288[_0x1269ef(0x48c)]||0x1,_0x4fdb7b=_0x50b288['Wait'];$gameScreen[_0x1269ef(0x391)](_0x4a4c33),$gameScreen[_0x1269ef(0x59f)](_0x35ce73,_0x4a07d8,_0x367a77);if(_0x4fdb7b){const _0x547fff=$gameTemp[_0x1269ef(0x724)]();if(_0x547fff)_0x547fff[_0x1269ef(0x134)](_0x367a77);}}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x57b),_0xb20efa=>{const _0x119ec3=_0x193f56;VisuMZ[_0x119ec3(0x7d0)](_0xb20efa,_0xb20efa);const _0x303428=_0xb20efa[_0x119ec3(0x5e5)]||0x1;$gameSystem[_0x119ec3(0x238)](_0x303428);}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x106),_0x592f1b=>{const _0x5bc28e=_0x193f56;if($gameParty[_0x5bc28e(0x6d7)]())return;VisuMZ['ConvertParams'](_0x592f1b,_0x592f1b);const _0x2d8d02=_0x592f1b['option'];if(_0x2d8d02[_0x5bc28e(0x3d7)](/Front/i))$gameSystem[_0x5bc28e(0x224)](![]);else _0x2d8d02[_0x5bc28e(0x3d7)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x5bc28e(0x224)](!$gameSystem[_0x5bc28e(0x88b)]());}),PluginManager['registerCommand'](pluginData[_0x193f56(0x41f)],'SystemLoadAudio',_0x2a95cc=>{const _0x292fbc=_0x193f56;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x2a95cc,_0x2a95cc);const _0x1a2033=[_0x292fbc(0x44c),_0x292fbc(0x413),'me','se'];for(const _0x572abb of _0x1a2033){const _0x53fc53=_0x2a95cc[_0x572abb],_0x340ee1=_0x292fbc(0x286)[_0x292fbc(0x627)](_0x572abb);for(const _0x1e17e5 of _0x53fc53){AudioManager[_0x292fbc(0x379)](_0x340ee1,_0x1e17e5);}}}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x30c),_0x2b8016=>{const _0x3b727d=_0x193f56;if($gameParty[_0x3b727d(0x6d7)]())return;VisuMZ[_0x3b727d(0x7d0)](_0x2b8016,_0x2b8016);const _0xb985ca=[_0x3b727d(0x5de),_0x3b727d(0x3e7),_0x3b727d(0x16c),'characters',_0x3b727d(0x5c8),_0x3b727d(0x827),'parallaxes',_0x3b727d(0x139),'sv_actors','sv_enemies',_0x3b727d(0x8bc),'tilesets',_0x3b727d(0x7e6),_0x3b727d(0x36f)];for(const _0x64c050 of _0xb985ca){const _0x3b7a1a=_0x2b8016[_0x64c050],_0x2ef6c9='img/%1/'[_0x3b727d(0x627)](_0x64c050);for(const _0x40c852 of _0x3b7a1a){if(_0x3b727d(0x5ba)===_0x3b727d(0x5ba))ImageManager[_0x3b727d(0x87b)](_0x2ef6c9,_0x40c852);else return this[_0x3b727d(0x80e)][_0x3b727d(0x2bb)](_0x2ab617);}}}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x802),_0x50fef9=>{const _0x1262a3=_0x193f56;if($gameParty[_0x1262a3(0x6d7)]())return;VisuMZ[_0x1262a3(0x7d0)](_0x50fef9,_0x50fef9);const _0x3d230c=_0x50fef9[_0x1262a3(0x664)],_0x310cea=(_0x50fef9[_0x1262a3(0x6fd)]||0x0)/0x64;for(const _0x3ca2ff of _0x3d230c){const _0x5c5515=Math[_0x1262a3(0x1ac)]()<=_0x310cea;$gameSwitches['setValue'](_0x3ca2ff,_0x5c5515);}}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],'SwitchRandomizeRange',_0x22ad63=>{const _0x485348=_0x193f56;if($gameParty[_0x485348(0x6d7)]())return;VisuMZ[_0x485348(0x7d0)](_0x22ad63,_0x22ad63);const _0x58b93f=Math['min'](_0x22ad63[_0x485348(0x813)],_0x22ad63[_0x485348(0x650)]),_0x151c01=Math[_0x485348(0x347)](_0x22ad63[_0x485348(0x813)],_0x22ad63[_0x485348(0x650)]),_0x21d341=(_0x22ad63[_0x485348(0x6fd)]||0x0)/0x64;for(let _0x5252c1=_0x58b93f;_0x5252c1<=_0x151c01;_0x5252c1++){if(_0x485348(0x424)!==_0x485348(0x424))_0x4a5b3b['missed']=![],_0xa06293[_0x485348(0x5e1)]=!![];else{const _0x3ec1ae=Math['random']()<=_0x21d341;$gameSwitches[_0x485348(0x5e3)](_0x5252c1,_0x3ec1ae);}}}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x51a),_0x4954a6=>{const _0x19bc95=_0x193f56;if($gameParty[_0x19bc95(0x6d7)]())return;VisuMZ['ConvertParams'](_0x4954a6,_0x4954a6);const _0x55596e=_0x4954a6[_0x19bc95(0x664)];for(const _0x1d03b6 of _0x55596e){const _0x348fe3=$gameSwitches['value'](_0x1d03b6);$gameSwitches[_0x19bc95(0x5e3)](_0x1d03b6,!_0x348fe3);}}),PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],'SwitchToggleRange',_0x34ec26=>{const _0x210278=_0x193f56;if($gameParty[_0x210278(0x6d7)]())return;VisuMZ[_0x210278(0x7d0)](_0x34ec26,_0x34ec26);const _0xbfcf55=Math[_0x210278(0x222)](_0x34ec26[_0x210278(0x813)],_0x34ec26['EndingID']),_0x338674=Math[_0x210278(0x347)](_0x34ec26[_0x210278(0x813)],_0x34ec26['EndingID']);for(let _0x209210=_0xbfcf55;_0x209210<=_0x338674;_0x209210++){const _0x4761b6=$gameSwitches['value'](_0x209210);$gameSwitches[_0x210278(0x5e3)](_0x209210,!_0x4761b6);}}),PluginManager[_0x193f56(0x395)](pluginData['name'],_0x193f56(0x13b),_0x26f239=>{const _0x5d97fe=_0x193f56;if($gameParty[_0x5d97fe(0x6d7)]())return;VisuMZ[_0x5d97fe(0x7d0)](_0x26f239,_0x26f239);const _0x5aafaa=_0x26f239[_0x5d97fe(0x5e5)][_0x5d97fe(0x125)]()[_0x5d97fe(0x4f6)](),_0x3981bb=VisuMZ[_0x5d97fe(0x818)][_0x5d97fe(0x5d5)](_0x5aafaa);$gameSystem[_0x5d97fe(0x7a9)](_0x3981bb);}),VisuMZ[_0x193f56(0x818)][_0x193f56(0x5d5)]=function(_0x3829ed){const _0x4ddbe3=_0x193f56;_0x3829ed=_0x3829ed||_0x4ddbe3(0x5da),_0x3829ed=String(_0x3829ed)[_0x4ddbe3(0x125)]()[_0x4ddbe3(0x4f6)]();switch(_0x3829ed){case _0x4ddbe3(0x241):return 0x0;case _0x4ddbe3(0x8e5):Imported[_0x4ddbe3(0x641)]&&(ConfigManager[_0x4ddbe3(0x8bb)]=!![]);return 0x1;case'TPB\x20WAIT':Imported[_0x4ddbe3(0x641)]&&(_0x4ddbe3(0x6b4)!==_0x4ddbe3(0x683)?ConfigManager['atbActive']=![]:_0x10788c[_0x4ddbe3(0x6c1)](_0x373e0d));return 0x2;case _0x4ddbe3(0x7c2):if(Imported[_0x4ddbe3(0x19e)])return'CTB';break;case _0x4ddbe3(0x182):if(Imported[_0x4ddbe3(0x478)])return _0x4ddbe3(0x182);break;case _0x4ddbe3(0x694):if(Imported[_0x4ddbe3(0x7a1)])return'HzKAB'===_0x4ddbe3(0x3cc)?_0x36feae['layoutSettings']['DummyRect'][_0x4ddbe3(0x865)](this):_0x4ddbe3(0x694);break;case _0x4ddbe3(0x43c):if(Imported[_0x4ddbe3(0x842)])return _0x4ddbe3(0x43c);break;case _0x4ddbe3(0x752):if(Imported['VisuMZ_2_BattleSystemOTB'])return _0x4ddbe3(0x752);break;case _0x4ddbe3(0x65e):if(Imported[_0x4ddbe3(0x232)]){if(_0x4ddbe3(0x686)!=='wHQCh')this[_0x4ddbe3(0x857)]();else return _0x4ddbe3(0x65e);}break;case'PTB':if(Imported[_0x4ddbe3(0x811)])return'PTB';break;}return $dataSystem[_0x4ddbe3(0x787)];},PluginManager[_0x193f56(0x395)](pluginData[_0x193f56(0x41f)],_0x193f56(0x691),_0x10f4ec=>{const _0x5ccd0f=_0x193f56;VisuMZ[_0x5ccd0f(0x7d0)](_0x10f4ec,_0x10f4ec);const _0x125e7=_0x10f4ec[_0x5ccd0f(0x5e5)]||0x1;$gameSystem[_0x5ccd0f(0x5e8)](_0x125e7);}),VisuMZ[_0x193f56(0x818)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x193f56(0x415)][_0x193f56(0x79c)],Scene_Boot[_0x193f56(0x415)][_0x193f56(0x79c)]=function(){const _0x216b8f=_0x193f56;VisuMZ[_0x216b8f(0x818)][_0x216b8f(0x5be)][_0x216b8f(0x865)](this),this[_0x216b8f(0x2d0)](),this[_0x216b8f(0x7dd)](),this[_0x216b8f(0x175)](),this[_0x216b8f(0x72f)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x216b8f(0x681)]();},VisuMZ['CoreEngine'][_0x193f56(0x4b7)]={},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x2d0)]=function(){const _0xb6beab=_0x193f56,_0x16a4aa=[_0xb6beab(0x5f0),_0xb6beab(0x4d5),_0xb6beab(0x1f3),_0xb6beab(0x100),_0xb6beab(0x1d3),_0xb6beab(0x5fa),_0xb6beab(0x43e),_0xb6beab(0x7cd)],_0x4bd501=[_0xb6beab(0x5f5),_0xb6beab(0x66f),_0xb6beab(0x11f),'CEV','MEV',_0xb6beab(0x4b8),_0xb6beab(0x2dd),_0xb6beab(0x2ec),_0xb6beab(0x17d),_0xb6beab(0x3da)],_0x1f31d4=['TGR',_0xb6beab(0x211),_0xb6beab(0x679),_0xb6beab(0x290),_0xb6beab(0x2b2),_0xb6beab(0x82b),_0xb6beab(0x6b1),'MDR',_0xb6beab(0x3de),_0xb6beab(0x7d2)],_0x1ab2be=[_0x16a4aa,_0x4bd501,_0x1f31d4],_0x330b98=[_0xb6beab(0x318),'Plus1',_0xb6beab(0x378),_0xb6beab(0x754),_0xb6beab(0x4fd),_0xb6beab(0x1d2),'Rate2',_0xb6beab(0x1f1),_0xb6beab(0x68c),_0xb6beab(0x522)];for(const _0x400a7b of _0x1ab2be){if('urhif'!==_0xb6beab(0x38b)){let _0x7c3a3='';if(_0x400a7b===_0x16a4aa)_0x7c3a3=_0xb6beab(0x287);if(_0x400a7b===_0x4bd501)_0x7c3a3=_0xb6beab(0x15a);if(_0x400a7b===_0x1f31d4)_0x7c3a3='sparam';for(const _0x174bbd of _0x330b98){let _0x4faa7a=_0xb6beab(0x1e4)[_0xb6beab(0x627)](_0x7c3a3,_0x174bbd);VisuMZ[_0xb6beab(0x818)][_0xb6beab(0x4b7)][_0x4faa7a]=[],VisuMZ[_0xb6beab(0x818)]['RegExp'][_0x4faa7a+'JS']=[];let _0x2d9c10=_0xb6beab(0x3a5);if(['Plus',_0xb6beab(0x1f1)][_0xb6beab(0x267)](_0x174bbd))_0x2d9c10+='([\x5c+\x5c-]\x5cd+)>';else{if(['Plus1',_0xb6beab(0x68c)]['includes'](_0x174bbd))_0x2d9c10+=_0xb6beab(0x48f);else{if(['Plus2','Flat2'][_0xb6beab(0x267)](_0x174bbd))_0x2d9c10+=_0xb6beab(0x4e2);else{if(_0x174bbd===_0xb6beab(0x754))_0x2d9c10+=_0xb6beab(0x296);else{if(_0x174bbd===_0xb6beab(0x1d2))_0x2d9c10+='(\x5cd+)([%％])>';else{if(_0x174bbd==='Rate2'){if(_0xb6beab(0x5b2)!==_0xb6beab(0x5b2))return _0x24dbee[_0xb6beab(0x818)][_0xb6beab(0x7fe)][_0xb6beab(0x168)][_0xb6beab(0x3a6)];else _0x2d9c10+=_0xb6beab(0x342);}}}}}}for(const _0x2f67d9 of _0x400a7b){if(_0xb6beab(0x399)!==_0xb6beab(0x19c)){let _0x34ddb5=_0x174bbd[_0xb6beab(0x552)](/[\d+]/g,'')['toUpperCase']();const _0x185259=_0x2d9c10[_0xb6beab(0x627)](_0x2f67d9,_0x34ddb5);VisuMZ[_0xb6beab(0x818)][_0xb6beab(0x4b7)][_0x4faa7a]['push'](new RegExp(_0x185259,'i'));const _0x8614b='<JS\x20%1\x20%2:[\x20](.*)>'[_0xb6beab(0x627)](_0x2f67d9,_0x34ddb5);VisuMZ[_0xb6beab(0x818)][_0xb6beab(0x4b7)][_0x4faa7a+'JS'][_0xb6beab(0x8a7)](new RegExp(_0x8614b,'i'));}else this['_spriteset'][_0xb6beab(0x4f0)](),this['_mapNameWindow'][_0xb6beab(0x4de)](),this['_windowLayer'][_0xb6beab(0x66c)]=![],_0x22ab0f['snapForBackground']();}}}else this['_pictureContainer']['scale']['x']=0x1/this[_0xb6beab(0x1d8)]['x'],this[_0xb6beab(0x21f)]['x']=-(this['x']/this[_0xb6beab(0x1d8)]['x']);}},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x7dd)]=function(){const _0xed3828=_0x193f56;if(VisuMZ[_0xed3828(0x681)])return;},Scene_Boot[_0x193f56(0x415)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x90ec18=_0x193f56,_0x440502=VisuMZ[_0x90ec18(0x818)][_0x90ec18(0x7fe)];_0x440502[_0x90ec18(0x168)]['OpenConsole']&&VisuMZ[_0x90ec18(0x4ef)](!![]);_0x440502[_0x90ec18(0x168)]['ModernControls']&&(Input[_0x90ec18(0x299)][0x23]=_0x90ec18(0x7b6),Input[_0x90ec18(0x299)][0x24]='home');if(_0x440502[_0x90ec18(0x5a3)]){const _0x3acf72=_0x440502[_0x90ec18(0x5a3)];_0x3acf72['KeySHIFT']=_0x3acf72[_0x90ec18(0x5c4)]||'\x5c}❪SHIFT❫\x5c{',_0x3acf72['KeyTAB']=_0x3acf72[_0x90ec18(0x7ea)]||'\x5c}❪TAB❫\x5c{';}_0x440502[_0x90ec18(0x26a)][_0x90ec18(0x6bb)]&&(_0x90ec18(0x1a8)!==_0x90ec18(0x1a8)?this[_0x90ec18(0x8f2)](_0x50c1c9):(Input[_0x90ec18(0x299)][0x57]='up',Input[_0x90ec18(0x299)][0x41]=_0x90ec18(0x77f),Input[_0x90ec18(0x299)][0x53]=_0x90ec18(0x1b0),Input[_0x90ec18(0x299)][0x44]='right',Input[_0x90ec18(0x299)][0x45]='pagedown')),_0x440502['KeyboardInput']['DashToggleR']&&(Input[_0x90ec18(0x299)][0x52]=_0x90ec18(0x18b)),_0x440502[_0x90ec18(0x14d)][_0x90ec18(0x70a)]=_0x440502[_0x90ec18(0x14d)][_0x90ec18(0x70a)][_0x90ec18(0x8e0)](_0x329739=>_0x329739[_0x90ec18(0x125)]()[_0x90ec18(0x4f6)]()),_0x440502[_0x90ec18(0x14d)]['ExtDisplayedParams']=_0x440502['Param'][_0x90ec18(0x72a)][_0x90ec18(0x8e0)](_0x54943b=>_0x54943b[_0x90ec18(0x125)]()['trim']());},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x72f)]=function(){const _0x5a52eb=_0x193f56;this[_0x5a52eb(0x771)]();},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x375676=_0x193f56,_0x2940c1=VisuMZ[_0x375676(0x818)][_0x375676(0x7fe)]['jsQuickFunc'];for(const _0x45b6e2 of _0x2940c1){if('nhIYi'==='NhIHM'){const _0x5164d0='AllTroops';_0x273eb4['remove'](_0x13ec0f)[_0x375676(0x195)]('')[_0x375676(0x195)](null);const _0x2b8837=_0x6e3802['join']('\x0a\x0a\x0a\x0a\x0a')[_0x375676(0x4f6)]();_0x1e41c9[_0x375676(0x818)][_0x375676(0x253)](_0x2b8837,_0x5164d0,!![]),_0x33ccdb[_0x375676(0x87f)][_0x375676(0x183)]=!![];}else{const _0x493bdd=_0x45b6e2['FunctionName'][_0x375676(0x552)](/[ ]/g,''),_0x3bcaee=_0x45b6e2[_0x375676(0x14b)];VisuMZ[_0x375676(0x818)][_0x375676(0x263)](_0x493bdd,_0x3bcaee);}}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x263)]=function(_0x56f170,_0xc27d1d){const _0xe9c923=_0x193f56;if(!!window[_0x56f170]){if($gameTemp[_0xe9c923(0x450)]())console[_0xe9c923(0x8d9)](_0xe9c923(0x56f)[_0xe9c923(0x627)](_0x56f170));}const _0x4442f5=_0xe9c923(0x245)['format'](_0x56f170,_0xc27d1d);window[_0x56f170]=new Function(_0x4442f5);},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x6ba)]=function(){const _0x1aec44=_0x193f56,_0x272aed=VisuMZ['CoreEngine'][_0x1aec44(0x7fe)][_0x1aec44(0x204)];if(!_0x272aed)return;for(const _0x2b4faf of _0x272aed){if(!_0x2b4faf)continue;VisuMZ[_0x1aec44(0x818)][_0x1aec44(0x488)](_0x2b4faf);}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x640)]={},VisuMZ[_0x193f56(0x818)][_0x193f56(0x2a6)]={},VisuMZ['CoreEngine'][_0x193f56(0x5c6)]={},VisuMZ[_0x193f56(0x818)][_0x193f56(0x3e0)]={},VisuMZ[_0x193f56(0x818)][_0x193f56(0x488)]=function(_0x4b1dfa){const _0x124593=_0x193f56,_0x115aaf=_0x4b1dfa[_0x124593(0x185)],_0x5ebfce=_0x4b1dfa[_0x124593(0x7fb)],_0x273f58=_0x4b1dfa[_0x124593(0x62f)],_0x2bef55=_0x4b1dfa[_0x124593(0x404)],_0x20c80f=new Function(_0x4b1dfa[_0x124593(0x487)]);VisuMZ[_0x124593(0x818)][_0x124593(0x640)][_0x115aaf['toUpperCase']()['trim']()]=_0x5ebfce,VisuMZ[_0x124593(0x818)][_0x124593(0x2a6)][_0x115aaf[_0x124593(0x125)]()[_0x124593(0x4f6)]()]=_0x273f58,VisuMZ[_0x124593(0x818)][_0x124593(0x5c6)][_0x115aaf[_0x124593(0x125)]()[_0x124593(0x4f6)]()]=_0x2bef55,VisuMZ['CoreEngine'][_0x124593(0x3e0)][_0x115aaf[_0x124593(0x125)]()[_0x124593(0x4f6)]()]=_0x115aaf,Object[_0x124593(0x590)](Game_BattlerBase[_0x124593(0x415)],_0x115aaf,{'get'(){const _0x2c80f7=_0x124593,_0x434569=_0x20c80f[_0x2c80f7(0x865)](this);return _0x2bef55===_0x2c80f7(0x60d)?Math[_0x2c80f7(0x44b)](_0x434569):_0x434569;}});},VisuMZ[_0x193f56(0x681)]=function(){const _0x4bd7a4=_0x193f56;for(const _0x61308c of $dataActors){if(_0x4bd7a4(0x3fc)!==_0x4bd7a4(0x583)){if(_0x61308c)VisuMZ[_0x4bd7a4(0x717)](_0x61308c);}else{const _0x16a57d=_0x55b5cd['indexOf'](_0x326cb3)+0x1;let _0x3801b2=_0x534f57+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x422277=_0x23ead0[_0x4bd7a4(0x818)]['ExtractStrFromList'](_0x16b423[_0x4bd7a4(0x440)]);_0x422277[_0x4bd7a4(0x8f1)]>0x0&&(_0x343861[_0x4bd7a4(0x8f1)]>0x0?_0x4eaa07+=_0xc4ad3c+_0x4bd7a4(0x178):_0x206de7+=_0x2be5f9+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x4bd7a4(0x627)](_0x536f12,_0x414681[_0x4bd7a4(0x41f)]||'Unnamed')+_0x3c5af9,_0x542fa7+=_0x3801b2[_0x4bd7a4(0x627)](_0x16a57d,_0x422277));}}for(const _0x16efe3 of $dataClasses){if(_0x16efe3)VisuMZ[_0x4bd7a4(0x388)](_0x16efe3);}for(const _0x1ebe62 of $dataSkills){if('ntnkv'!=='EHhPH'){if(_0x1ebe62)VisuMZ['ParseSkillNotetags'](_0x1ebe62);}else{const _0x1372e0=_0x4bd7a4(0x21b);this[_0x4bd7a4(0x406)]=this['_colorCache']||{};if(this[_0x4bd7a4(0x406)][_0x1372e0])return this['_colorCache'][_0x1372e0];const _0x46216a=_0x176e54[_0x4bd7a4(0x818)][_0x4bd7a4(0x7fe)]['Color']['ColorTPGauge1'];return this[_0x4bd7a4(0x860)](_0x1372e0,_0x46216a);}}for(const _0x48bf1c of $dataItems){if('zAjhE'!==_0x4bd7a4(0x821)){if(_0x48bf1c)VisuMZ[_0x4bd7a4(0x6c6)](_0x48bf1c);}else return _0x1b8be4['CoreEngine'][_0x4bd7a4(0x7fe)]['UI'][_0x4bd7a4(0x7e8)];}for(const _0x2de524 of $dataWeapons){if(_0x4bd7a4(0x1ed)===_0x4bd7a4(0x1ed)){if(_0x2de524)VisuMZ['ParseWeaponNotetags'](_0x2de524);}else this[_0x4bd7a4(0x6fc)]={},_0xfdf01f[_0x4bd7a4(0x818)][_0x4bd7a4(0x871)][_0x4bd7a4(0x865)](this);}for(const _0x852b8a of $dataArmors){if(_0x852b8a)VisuMZ[_0x4bd7a4(0x258)](_0x852b8a);}for(const _0x38109b of $dataEnemies){if(_0x38109b)VisuMZ['ParseEnemyNotetags'](_0x38109b);}for(const _0x2dff1e of $dataStates){if(_0x4bd7a4(0x743)==='GiJSc')return this[_0x4bd7a4(0x46b)]()?_0x18e2ff[_0x4bd7a4(0x2b6)]('tab'):_0x506e5e[_0x4bd7a4(0x415)][_0x4bd7a4(0x20e)][_0x4bd7a4(0x865)](this);else{if(_0x2dff1e)VisuMZ['ParseStateNotetags'](_0x2dff1e);}}for(const _0x85eb9b of $dataTilesets){if(_0x85eb9b)VisuMZ[_0x4bd7a4(0x45f)](_0x85eb9b);}},VisuMZ[_0x193f56(0x717)]=function(_0x21bf25){},VisuMZ['ParseClassNotetags']=function(_0x20d528){},VisuMZ[_0x193f56(0x4a1)]=function(_0x25e566){},VisuMZ['ParseItemNotetags']=function(_0x27c2d5){},VisuMZ[_0x193f56(0x2a5)]=function(_0x4bb452){},VisuMZ[_0x193f56(0x258)]=function(_0x31ecea){},VisuMZ[_0x193f56(0x5a6)]=function(_0x4b78ab){},VisuMZ[_0x193f56(0x6be)]=function(_0x51f410){},VisuMZ[_0x193f56(0x45f)]=function(_0x549154){},VisuMZ[_0x193f56(0x818)]['ParseActorNotetags']=VisuMZ[_0x193f56(0x717)],VisuMZ[_0x193f56(0x717)]=function(_0x45e7a6){const _0x19ea17=_0x193f56;VisuMZ['CoreEngine']['ParseActorNotetags'][_0x19ea17(0x865)](this,_0x45e7a6);const _0x4caa50=_0x45e7a6['note'];if(_0x4caa50[_0x19ea17(0x3d7)](/<MAX LEVEL:[ ](\d+)>/i)){_0x45e7a6[_0x19ea17(0x1eb)]=Number(RegExp['$1']);if(_0x45e7a6['maxLevel']===0x0)_0x45e7a6[_0x19ea17(0x1eb)]=Number[_0x19ea17(0x4c6)];}_0x4caa50['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x45e7a6[_0x19ea17(0x2f5)]=Math['min'](Number(RegExp['$1']),_0x45e7a6[_0x19ea17(0x1eb)]));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x388)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x193f56(0x388)]=function(_0x47be95){const _0x97fe49=_0x193f56;VisuMZ['CoreEngine'][_0x97fe49(0x388)]['call'](this,_0x47be95);if(_0x47be95[_0x97fe49(0x37d)]){if(_0x97fe49(0x8d5)!==_0x97fe49(0x39d))for(const _0x1ff925 of _0x47be95[_0x97fe49(0x37d)]){_0x1ff925[_0x97fe49(0x365)][_0x97fe49(0x3d7)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x1ff925[_0x97fe49(0x3e5)]=Math[_0x97fe49(0x347)](Number(RegExp['$1']),0x1));}else return _0x499864[_0x97fe49(0x849)]&&_0x44eaaf[_0x97fe49(0x35f)][_0x97fe49(0x267)]('['+_0x101cfb+']');}},VisuMZ['CoreEngine'][_0x193f56(0x5a6)]=VisuMZ[_0x193f56(0x5a6)],VisuMZ[_0x193f56(0x5a6)]=function(_0x46bf5b){const _0x3e37b4=_0x193f56;VisuMZ[_0x3e37b4(0x818)][_0x3e37b4(0x5a6)]['call'](this,_0x46bf5b),_0x46bf5b[_0x3e37b4(0x3e5)]=0x1;const _0x388f3b=_0x46bf5b[_0x3e37b4(0x365)];if(_0x388f3b[_0x3e37b4(0x3d7)](/<LEVEL:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x3e5)]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<MAXHP:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x531)][0x0]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<MAXMP:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x531)][0x1]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<ATK:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x531)][0x2]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<DEF:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x531)][0x3]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<MAT:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x531)][0x4]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<MDF:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x531)][0x5]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<AGI:[ ](\d+)>/i))_0x46bf5b[_0x3e37b4(0x531)][0x6]=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<LUK:[ ](\d+)>/i))_0x46bf5b['params'][0x7]=Number(RegExp['$1']);if(_0x388f3b['match'](/<EXP:[ ](\d+)>/i))_0x46bf5b['exp']=Number(RegExp['$1']);if(_0x388f3b[_0x3e37b4(0x3d7)](/<GOLD:[ ](\d+)>/i))_0x46bf5b['gold']=Number(RegExp['$1']);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x8e2)]=Graphics[_0x193f56(0x502)],Graphics['_defaultStretchMode']=function(){const _0x124cb9=_0x193f56;switch(VisuMZ[_0x124cb9(0x818)][_0x124cb9(0x7fe)]['QoL'][_0x124cb9(0x7d1)]){case _0x124cb9(0x25b):return!![];case _0x124cb9(0x1fa):return![];default:return VisuMZ['CoreEngine'][_0x124cb9(0x8e2)]['call'](this);}},VisuMZ[_0x193f56(0x818)]['Graphics_printError']=Graphics[_0x193f56(0x638)],Graphics[_0x193f56(0x638)]=function(_0x54a387,_0x3998e3,_0x2bcdca=null){const _0xb292d7=_0x193f56;VisuMZ['CoreEngine'][_0xb292d7(0x69c)][_0xb292d7(0x865)](this,_0x54a387,_0x3998e3,_0x2bcdca),VisuMZ[_0xb292d7(0x4ef)](![]);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x2c6)]=Graphics[_0x193f56(0x1f5)],Graphics['_centerElement']=function(_0x563876){const _0x51cc2a=_0x193f56;VisuMZ[_0x51cc2a(0x818)][_0x51cc2a(0x2c6)][_0x51cc2a(0x865)](this,_0x563876),this[_0x51cc2a(0x8ca)](_0x563876);},Graphics[_0x193f56(0x8ca)]=function(_0x20b09e){const _0x578e3c=_0x193f56;VisuMZ[_0x578e3c(0x818)][_0x578e3c(0x7fe)][_0x578e3c(0x168)][_0x578e3c(0x41d)]&&(_0x20b09e[_0x578e3c(0x12b)]['font-smooth']=_0x578e3c(0x88e));VisuMZ[_0x578e3c(0x818)]['Settings']['QoL'][_0x578e3c(0x49b)]&&(_0x578e3c(0x46a)!==_0x578e3c(0x46a)?_0x57f12d[_0x578e3c(0x5cb)]=_0x2c7bff[_0x578e3c(0x83b)][_0x578e3c(0x512)]:_0x20b09e[_0x578e3c(0x12b)]['image-rendering']=_0x578e3c(0x360));const _0x38eab4=Math['max'](0x0,Math['floor'](_0x20b09e[_0x578e3c(0x890)]*this['_realScale'])),_0x3e1589=Math[_0x578e3c(0x347)](0x0,Math[_0x578e3c(0x66d)](_0x20b09e[_0x578e3c(0x89f)]*this[_0x578e3c(0x341)]));_0x20b09e['style']['width']=_0x38eab4+'px',_0x20b09e['style'][_0x578e3c(0x89f)]=_0x3e1589+'px';},VisuMZ['CoreEngine']['Bitmap_initialize']=Bitmap[_0x193f56(0x415)][_0x193f56(0x7c5)],Bitmap[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(_0x37b2f0,_0x4c4fe1){const _0x332e71=_0x193f56;VisuMZ[_0x332e71(0x818)][_0x332e71(0x419)]['call'](this,_0x37b2f0,_0x4c4fe1),this[_0x332e71(0x7d3)]=!(VisuMZ[_0x332e71(0x818)][_0x332e71(0x7fe)][_0x332e71(0x168)][_0x332e71(0x49b)]??!![]);},Bitmap[_0x193f56(0x415)][_0x193f56(0x1f8)]=function(){const _0x2dadf1=_0x193f56;this[_0x2dadf1(0x1a5)]=!![];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x7d5)]=Sprite[_0x193f56(0x415)][_0x193f56(0x595)],Sprite[_0x193f56(0x415)][_0x193f56(0x595)]=function(){const _0xbb11e4=_0x193f56;VisuMZ[_0xbb11e4(0x818)]['Sprite_destroy'][_0xbb11e4(0x865)](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x193f56(0x415)][_0x193f56(0x22a)]=function(){const _0x1d210b=_0x193f56;if(!this['bitmap'])return;if(!this[_0x1d210b(0x481)][_0x1d210b(0x1a5)])return;this[_0x1d210b(0x481)][_0x1d210b(0x3cb)]&&!this[_0x1d210b(0x3e9)]['_baseTexture']['destroyed']&&this['bitmap'][_0x1d210b(0x595)]();},VisuMZ[_0x193f56(0x818)]['Bitmap_resize']=Bitmap[_0x193f56(0x415)][_0x193f56(0x112)],Bitmap[_0x193f56(0x415)][_0x193f56(0x112)]=function(_0x2ba76a,_0x2d9213){const _0x288e31=_0x193f56;VisuMZ[_0x288e31(0x818)][_0x288e31(0x85e)][_0x288e31(0x865)](this,_0x2ba76a,_0x2d9213),this['markCoreEngineModified']();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x273)]=Bitmap['prototype'][_0x193f56(0x254)],Bitmap[_0x193f56(0x415)][_0x193f56(0x254)]=function(_0x176557,_0x5a1555,_0x43b019,_0x13fc04,_0xf26d35,_0x5e45d6,_0x26c887,_0x369a74,_0x6be80){const _0x1a2098=_0x193f56;_0x5a1555=Math[_0x1a2098(0x44b)](_0x5a1555),_0x43b019=Math[_0x1a2098(0x44b)](_0x43b019),_0x13fc04=Math[_0x1a2098(0x44b)](_0x13fc04),_0xf26d35=Math[_0x1a2098(0x44b)](_0xf26d35),_0x5e45d6=Math[_0x1a2098(0x44b)](_0x5e45d6),_0x26c887=Math[_0x1a2098(0x44b)](_0x26c887),VisuMZ[_0x1a2098(0x818)]['Bitmap_blt'][_0x1a2098(0x865)](this,_0x176557,_0x5a1555,_0x43b019,_0x13fc04,_0xf26d35,_0x5e45d6,_0x26c887,_0x369a74,_0x6be80),this['markCoreEngineModified']();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x2b3)]=Bitmap[_0x193f56(0x415)]['clearRect'],Bitmap[_0x193f56(0x415)][_0x193f56(0x76f)]=function(_0x3cbd63,_0x478788,_0x21e574,_0x19d00c){const _0x562128=_0x193f56;VisuMZ[_0x562128(0x818)][_0x562128(0x2b3)][_0x562128(0x865)](this,_0x3cbd63,_0x478788,_0x21e574,_0x19d00c),this['markCoreEngineModified']();},VisuMZ[_0x193f56(0x818)]['Bitmap_fillRect']=Bitmap[_0x193f56(0x415)][_0x193f56(0x517)],Bitmap[_0x193f56(0x415)][_0x193f56(0x517)]=function(_0x400fc6,_0x58546a,_0x416705,_0x459e03,_0x548cd0){const _0x449d90=_0x193f56;VisuMZ[_0x449d90(0x818)][_0x449d90(0x3f7)][_0x449d90(0x865)](this,_0x400fc6,_0x58546a,_0x416705,_0x459e03,_0x548cd0),this[_0x449d90(0x1f8)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x29f)]=Bitmap[_0x193f56(0x415)][_0x193f56(0x4c7)],Bitmap[_0x193f56(0x415)][_0x193f56(0x4c7)]=function(_0x56ecc9,_0x2af246,_0x337281,_0x4457e6,_0x66ca56){const _0x5c4f4f=_0x193f56;VisuMZ['CoreEngine']['Bitmap_strokeRect'][_0x5c4f4f(0x865)](this,_0x56ecc9,_0x2af246,_0x337281,_0x4457e6,_0x66ca56),this[_0x5c4f4f(0x1f8)]();},VisuMZ['CoreEngine'][_0x193f56(0x5f7)]=Bitmap[_0x193f56(0x415)]['gradientFillRect'],Bitmap[_0x193f56(0x415)][_0x193f56(0x401)]=function(_0x4c9a13,_0x431c35,_0x16e643,_0x4324a2,_0x3361fa,_0x2c4417,_0x40885e){const _0x20ac69=_0x193f56;VisuMZ[_0x20ac69(0x818)][_0x20ac69(0x5f7)][_0x20ac69(0x865)](this,_0x4c9a13,_0x431c35,_0x16e643,_0x4324a2,_0x3361fa,_0x2c4417,_0x40885e),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x193f56(0x795)]=Bitmap['prototype'][_0x193f56(0x1f0)],Bitmap[_0x193f56(0x415)]['drawCircle']=function(_0x17d972,_0x329000,_0x219222,_0x7f10c9){const _0x440e82=_0x193f56;_0x17d972=Math[_0x440e82(0x44b)](_0x17d972),_0x329000=Math[_0x440e82(0x44b)](_0x329000),_0x219222=Math[_0x440e82(0x44b)](_0x219222),VisuMZ[_0x440e82(0x818)][_0x440e82(0x795)][_0x440e82(0x865)](this,_0x17d972,_0x329000,_0x219222,_0x7f10c9),this[_0x440e82(0x1f8)]();},VisuMZ['CoreEngine']['Bitmap_measureTextWidth']=Bitmap[_0x193f56(0x415)][_0x193f56(0x889)],Bitmap[_0x193f56(0x415)][_0x193f56(0x889)]=function(_0x3bf168){const _0x533fdb=_0x193f56;return Math[_0x533fdb(0x840)](VisuMZ['CoreEngine'][_0x533fdb(0x847)][_0x533fdb(0x865)](this,_0x3bf168));},VisuMZ['CoreEngine'][_0x193f56(0x336)]=Bitmap['prototype'][_0x193f56(0x84f)],Bitmap['prototype']['drawText']=function(_0x4f081c,_0x2f07aa,_0x1ae796,_0x23efe3,_0xa7a2ac,_0x177948){const _0x1e45d8=_0x193f56;_0x2f07aa=Math[_0x1e45d8(0x44b)](_0x2f07aa),_0x1ae796=Math[_0x1e45d8(0x44b)](_0x1ae796),_0x23efe3=Math[_0x1e45d8(0x44b)](_0x23efe3),_0xa7a2ac=Math['round'](_0xa7a2ac),VisuMZ[_0x1e45d8(0x818)]['Bitmap_drawText'][_0x1e45d8(0x865)](this,_0x4f081c,_0x2f07aa,_0x1ae796,_0x23efe3,_0xa7a2ac,_0x177948),this[_0x1e45d8(0x1f8)]();},VisuMZ[_0x193f56(0x818)]['Bitmap_drawTextOutline']=Bitmap[_0x193f56(0x415)][_0x193f56(0x892)],Bitmap[_0x193f56(0x415)][_0x193f56(0x892)]=function(_0x51edeb,_0x17e130,_0x2b7480,_0x422d7e){const _0x1c233c=_0x193f56;if(VisuMZ[_0x1c233c(0x818)][_0x1c233c(0x7fe)][_0x1c233c(0x168)]['FontShadows']){if('RPzOE'==='RPzOE')this['_drawTextShadow'](_0x51edeb,_0x17e130,_0x2b7480,_0x422d7e);else return _0x5e555[_0x1c233c(0x26d)];}else{if('XuOVy'===_0x1c233c(0x568)){const _0x49895c=_0x1885a3[_0x1c233c(0x818)][_0x1c233c(0x7fe)][_0x1c233c(0x5a3)],_0x4720ec=_0x49895c[_0x1c233c(0x196)],_0x30376b=_0x203600['pop'](),_0x52db16='Key%1'[_0x1c233c(0x627)](_0x30376b);return _0x49895c[_0x52db16]?_0x49895c[_0x52db16]:_0x4720ec[_0x1c233c(0x627)](_0x30376b);}else VisuMZ[_0x1c233c(0x818)][_0x1c233c(0x53c)][_0x1c233c(0x865)](this,_0x51edeb,_0x17e130,_0x2b7480,_0x422d7e);}},Bitmap[_0x193f56(0x415)][_0x193f56(0x2f7)]=function(_0x3bc6cd,_0xf4654c,_0x3c9af8,_0x2ec1b3){const _0x112a39=_0x193f56,_0x249121=this['context'];_0x249121['fillStyle']=this['outlineColor'],_0x249121[_0x112a39(0x499)](_0x3bc6cd,_0xf4654c+0x2,_0x3c9af8+0x2,_0x2ec1b3);},VisuMZ['CoreEngine'][_0x193f56(0x140)]=Input[_0x193f56(0x418)],Input[_0x193f56(0x418)]=function(){const _0x49499d=_0x193f56;VisuMZ[_0x49499d(0x818)][_0x49499d(0x140)][_0x49499d(0x865)](this),this[_0x49499d(0x805)]=undefined,this[_0x49499d(0x3cf)]=undefined,this['_gamepadWait']=Input['keyRepeatWait'];},VisuMZ[_0x193f56(0x818)]['Input_update']=Input[_0x193f56(0x4f0)],Input['update']=function(){const _0x304e35=_0x193f56;VisuMZ[_0x304e35(0x818)]['Input_update'][_0x304e35(0x865)](this);if(this[_0x304e35(0x42e)])this[_0x304e35(0x42e)]--;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x337)]=Input[_0x193f56(0x3cd)],Input[_0x193f56(0x3cd)]=function(){const _0x30c367=_0x193f56;if(this['_gamepadWait'])return;VisuMZ[_0x30c367(0x818)][_0x30c367(0x337)][_0x30c367(0x865)](this);},VisuMZ['CoreEngine'][_0x193f56(0x4d6)]=Input['_setupEventHandlers'],Input[_0x193f56(0x85b)]=function(){const _0x4dd680=_0x193f56;VisuMZ[_0x4dd680(0x818)][_0x4dd680(0x4d6)][_0x4dd680(0x865)](this),document[_0x4dd680(0x327)]('keypress',this[_0x4dd680(0x2bf)][_0x4dd680(0x65c)](this));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x29b)]=Input['_onKeyDown'],Input[_0x193f56(0x5b8)]=function(_0x13a7e6){const _0xc9fa1d=_0x193f56;this[_0xc9fa1d(0x3cf)]=_0x13a7e6[_0xc9fa1d(0x6ef)],VisuMZ[_0xc9fa1d(0x818)][_0xc9fa1d(0x29b)][_0xc9fa1d(0x865)](this,_0x13a7e6);},Input['_onKeyPress']=function(_0x4e6b6d){const _0x2b07b8=_0x193f56;this[_0x2b07b8(0x822)](_0x4e6b6d);},Input[_0x193f56(0x822)]=function(_0x3920ad){const _0x3a017a=_0x193f56;this[_0x3a017a(0x3cf)]=_0x3920ad[_0x3a017a(0x6ef)];let _0x274821=String['fromCharCode'](_0x3920ad['charCode']);this[_0x3a017a(0x805)]===undefined?_0x3a017a(0x274)===_0x3a017a(0x472)?_0x33d6fa['moveRelativeToResolutionChange']():this['_inputString']=_0x274821:this['_inputString']+=_0x274821;},VisuMZ['CoreEngine'][_0x193f56(0x64a)]=Input[_0x193f56(0x236)],Input[_0x193f56(0x236)]=function(_0x5f5403){const _0xa3cbe0=_0x193f56;if(_0x5f5403===0x8)return![];return VisuMZ[_0xa3cbe0(0x818)][_0xa3cbe0(0x64a)][_0xa3cbe0(0x865)](this,_0x5f5403);},Input[_0x193f56(0x2ea)]=function(_0x520fac){const _0x4996a9=_0x193f56;if(_0x520fac[_0x4996a9(0x3d7)](/backspace/i))return this[_0x4996a9(0x3cf)]===0x8;if(_0x520fac[_0x4996a9(0x3d7)](/enter/i))return this[_0x4996a9(0x3cf)]===0xd;if(_0x520fac[_0x4996a9(0x3d7)](/escape/i))return this[_0x4996a9(0x3cf)]===0x1b;},Input[_0x193f56(0x783)]=function(){const _0x4cc0f1=_0x193f56;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4cc0f1(0x2e4)](this['_inputSpecialKeyCode']);},Input[_0x193f56(0x1a9)]=function(){const _0x590f70=_0x193f56;return[0x25,0x26,0x27,0x28][_0x590f70(0x2e4)](this['_inputSpecialKeyCode']);},Input[_0x193f56(0x170)]=function(){const _0x3bba79=_0x193f56;if(navigator[_0x3bba79(0x6e3)]){const _0x40b3c4=navigator['getGamepads']();if(_0x40b3c4)for(const _0x2a7747 of _0x40b3c4){if(_0x2a7747&&_0x2a7747['connected'])return!![];}}return![];},Input['isGamepadTriggered']=function(){const _0x389604=_0x193f56;if(navigator[_0x389604(0x6e3)]){const _0x5edba9=navigator[_0x389604(0x6e3)]();if(_0x5edba9)for(const _0x463e1c of _0x5edba9){if(_0x463e1c&&_0x463e1c[_0x389604(0x815)]){if(this[_0x389604(0x13e)](_0x463e1c))return!![];}}}return![];},Input[_0x193f56(0x13e)]=function(_0x5a55ce){const _0x2b48be=_0x193f56,_0x17affa=_0x5a55ce[_0x2b48be(0x145)];for(let _0x3764e8=0x0;_0x3764e8<_0x17affa[_0x2b48be(0x8f1)];_0x3764e8++){if(_0x2b48be(0x731)!==_0x2b48be(0x4b1)){if(_0x17affa[_0x3764e8][_0x2b48be(0x2e3)])return!![];}else return this[_0x2b48be(0x5e6)](_0x50ed8d);}return![];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x687)]=Tilemap[_0x193f56(0x415)]['_addShadow'],Tilemap[_0x193f56(0x415)][_0x193f56(0x3f6)]=function(_0x56c403,_0x3f7a93,_0x49841a,_0x593b64){const _0x346ae2=_0x193f56;if($gameMap&&$gameMap[_0x346ae2(0x7f4)]())return;VisuMZ[_0x346ae2(0x818)][_0x346ae2(0x687)][_0x346ae2(0x865)](this,_0x56c403,_0x3f7a93,_0x49841a,_0x593b64);},Tilemap[_0x193f56(0x477)]['prototype'][_0x193f56(0x7f8)]=function(){const _0x1288da=_0x193f56;this['_destroyInternalTextures']();for(let _0x53719b=0x0;_0x53719b<Tilemap['Layer'][_0x1288da(0x7b4)];_0x53719b++){const _0x2613f8=new PIXI['BaseTexture']();_0x2613f8['setSize'](0x800,0x800),VisuMZ[_0x1288da(0x818)]['Settings'][_0x1288da(0x168)][_0x1288da(0x49b)]&&(_0x2613f8['scaleMode']=PIXI[_0x1288da(0x83b)][_0x1288da(0x512)]),this['_internalTextures'][_0x1288da(0x8a7)](_0x2613f8);}},WindowLayer[_0x193f56(0x415)][_0x193f56(0x40f)]=function(){const _0x5e6c63=_0x193f56;if(SceneManager&&SceneManager[_0x5e6c63(0x87f)])return SceneManager['_scene'][_0x5e6c63(0x40d)]();else{if(_0x5e6c63(0x22d)!==_0x5e6c63(0x22d))this[_0x5e6c63(0x65f)]=0x2;else return!![];}},VisuMZ['CoreEngine'][_0x193f56(0x39c)]=WindowLayer['prototype']['render'],WindowLayer[_0x193f56(0x415)]['render']=function render(_0xa0b0b5){const _0xd874a1=_0x193f56;this[_0xd874a1(0x40f)]()?_0xd874a1(0x78c)!=='VmIkQ'?_0x185f98[_0xd874a1(0x722)]&&(this[_0xd874a1(0x65f)]='OTB'):VisuMZ[_0xd874a1(0x818)][_0xd874a1(0x39c)]['call'](this,_0xa0b0b5):this[_0xd874a1(0x5a1)](_0xa0b0b5);},WindowLayer[_0x193f56(0x415)][_0x193f56(0x5a1)]=function render(_0x2d7815){const _0x4deb4a=_0x193f56;if(!this[_0x4deb4a(0x66c)])return;const _0x395c15=new PIXI[(_0x4deb4a(0x748))](),_0x4b9d5a=_0x2d7815['gl'],_0x15375e=this['children'][_0x4deb4a(0x330)]();_0x2d7815[_0x4deb4a(0x10c)][_0x4deb4a(0x411)](),_0x395c15['transform']=this[_0x4deb4a(0x311)],_0x2d7815[_0x4deb4a(0x41b)][_0x4deb4a(0x59c)](),_0x4b9d5a[_0x4deb4a(0x83a)](_0x4b9d5a[_0x4deb4a(0x455)]);while(_0x15375e['length']>0x0){const _0x3656ec=_0x15375e[_0x4deb4a(0x73a)]();_0x3656ec[_0x4deb4a(0x703)]&&_0x3656ec[_0x4deb4a(0x66c)]&&_0x3656ec['openness']>0x0&&(_0x4b9d5a[_0x4deb4a(0x22b)](_0x4b9d5a[_0x4deb4a(0x678)],0x0,~0x0),_0x4b9d5a[_0x4deb4a(0x5fc)](_0x4b9d5a['KEEP'],_0x4b9d5a[_0x4deb4a(0x89d)],_0x4b9d5a[_0x4deb4a(0x89d)]),_0x3656ec[_0x4deb4a(0x44d)](_0x2d7815),_0x2d7815['batch']['flush'](),_0x395c15[_0x4deb4a(0x418)](),_0x4b9d5a['stencilFunc'](_0x4b9d5a[_0x4deb4a(0x431)],0x1,~0x0),_0x4b9d5a[_0x4deb4a(0x5fc)](_0x4b9d5a[_0x4deb4a(0x480)],_0x4b9d5a[_0x4deb4a(0x480)],_0x4b9d5a[_0x4deb4a(0x480)]),_0x4b9d5a[_0x4deb4a(0x698)](_0x4b9d5a['ZERO'],_0x4b9d5a[_0x4deb4a(0x3f4)]),_0x395c15[_0x4deb4a(0x44d)](_0x2d7815),_0x2d7815[_0x4deb4a(0x41b)]['flush'](),_0x4b9d5a[_0x4deb4a(0x698)](_0x4b9d5a['ONE'],_0x4b9d5a[_0x4deb4a(0x4e4)]));}_0x4b9d5a[_0x4deb4a(0x10a)](_0x4b9d5a['STENCIL_TEST']),_0x4b9d5a[_0x4deb4a(0x418)](_0x4b9d5a[_0x4deb4a(0x49d)]),_0x4b9d5a[_0x4deb4a(0x420)](0x0),_0x2d7815[_0x4deb4a(0x41b)]['flush']();for(const _0x7a5510 of this[_0x4deb4a(0x18f)]){!_0x7a5510[_0x4deb4a(0x703)]&&_0x7a5510[_0x4deb4a(0x66c)]&&_0x7a5510['render'](_0x2d7815);}_0x2d7815[_0x4deb4a(0x41b)][_0x4deb4a(0x59c)]();},DataManager[_0x193f56(0x36a)]=function(_0x11d809){const _0x5a58f6=_0x193f56;return this['isItem'](_0x11d809)&&_0x11d809[_0x5a58f6(0x7cb)]===0x2;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x15b)]=DataManager[_0x193f56(0x4e7)],DataManager[_0x193f56(0x4e7)]=function(){const _0x5cbb82=_0x193f56;VisuMZ[_0x5cbb82(0x818)]['DataManager_setupNewGame'][_0x5cbb82(0x865)](this),this['reservePlayTestNewGameCommonEvent'](),this['reserveNewGameCommonEvent']();},DataManager[_0x193f56(0x88a)]=function(){const _0x553311=_0x193f56;if($gameTemp[_0x553311(0x450)]()){const _0x7e3ca6=VisuMZ['CoreEngine'][_0x553311(0x7fe)][_0x553311(0x168)][_0x553311(0x882)];if(_0x7e3ca6>0x0)$gameTemp[_0x553311(0x2ce)](_0x7e3ca6);}},DataManager[_0x193f56(0x5a8)]=function(){const _0x4cdefb=_0x193f56,_0x2cae7a=VisuMZ[_0x4cdefb(0x818)][_0x4cdefb(0x7fe)][_0x4cdefb(0x168)][_0x4cdefb(0x423)]||0x0;if(_0x2cae7a>0x0)$gameTemp[_0x4cdefb(0x2ce)](_0x2cae7a);},DataManager[_0x193f56(0x3c1)]=function(_0x82c315){const _0xe9927e=_0x193f56,_0x29e75f=$dataTroops[_0x82c315];if(!_0x29e75f)return'';let _0x56394d='';_0x56394d+=_0x29e75f[_0xe9927e(0x41f)];for(const _0x8f2d8c of _0x29e75f[_0xe9927e(0x862)]){for(const _0x527836 of _0x8f2d8c['list']){[0x6c,0x198][_0xe9927e(0x267)](_0x527836['code'])&&(_0x56394d+='\x0a',_0x56394d+=_0x527836[_0xe9927e(0x65a)][0x0]);}}return _0x56394d;};(VisuMZ['CoreEngine'][_0x193f56(0x7fe)][_0x193f56(0x168)][_0x193f56(0x616)]??!![])&&($scene=null,VisuMZ['CoreEngine'][_0x193f56(0x31d)]=Scene_Base[_0x193f56(0x415)][_0x193f56(0x1cd)],Scene_Base['prototype'][_0x193f56(0x1cd)]=function(){const _0x10e97a=_0x193f56;VisuMZ['CoreEngine'][_0x10e97a(0x31d)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x193f56(0x818)]['Scene_Map_createSpriteset']=Scene_Map[_0x193f56(0x415)][_0x193f56(0x4b6)],Scene_Map[_0x193f56(0x415)][_0x193f56(0x4b6)]=function(){const _0x29c815=_0x193f56;VisuMZ[_0x29c815(0x818)][_0x29c815(0x2ee)][_0x29c815(0x865)](this),$spriteset=this[_0x29c815(0x3f1)];},VisuMZ[_0x193f56(0x818)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x193f56(0x415)][_0x193f56(0x4b6)],Scene_Battle[_0x193f56(0x415)][_0x193f56(0x4b6)]=function(){const _0x267dd2=_0x193f56;VisuMZ[_0x267dd2(0x818)][_0x267dd2(0x8f5)][_0x267dd2(0x865)](this),$spriteset=this[_0x267dd2(0x3f1)];},VisuMZ['CoreEngine'][_0x193f56(0x11c)]=Scene_Base['prototype'][_0x193f56(0x366)],Scene_Base['prototype'][_0x193f56(0x366)]=function(){const _0x220461=_0x193f56;VisuMZ[_0x220461(0x818)][_0x220461(0x11c)][_0x220461(0x865)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x193f56(0x818)][_0x193f56(0x5ed)]=BattleManager['update'],BattleManager[_0x193f56(0x4f0)]=function(_0xb65d23){const _0x59fafa=_0x193f56;VisuMZ[_0x59fafa(0x818)][_0x59fafa(0x5ed)][_0x59fafa(0x865)](this,_0xb65d23),$subject=this['_subject'],$targets=this['_targets'],$target=this[_0x59fafa(0x78d)]||this[_0x59fafa(0x1dd)][0x0];},$event=null,VisuMZ['CoreEngine'][_0x193f56(0x8ac)]=Game_Event['prototype']['start'],Game_Event[_0x193f56(0x415)][_0x193f56(0x372)]=function(){const _0x1c4a5d=_0x193f56;VisuMZ[_0x1c4a5d(0x818)]['Game_Event_start'][_0x1c4a5d(0x865)](this),$event=this;},VisuMZ['CoreEngine']['Scene_Map_update']=Scene_Map['prototype'][_0x193f56(0x4f0)],Scene_Map[_0x193f56(0x415)]['update']=function(){const _0x549ec6=_0x193f56;VisuMZ[_0x549ec6(0x818)][_0x549ec6(0x830)]['call'](this),$gameMap[_0x549ec6(0x49a)]();},Game_Map[_0x193f56(0x415)][_0x193f56(0x49a)]=function(){const _0x3bd02b=_0x193f56;!this[_0x3bd02b(0x2f4)]()&&$event!==null&&(_0x3bd02b(0x2e1)==='zvgPc'?$event=null:this['_isPlaytest']=![]);},$commonEvent=function(_0xb06d2){const _0x529a77=_0x193f56;if($gameTemp)$gameTemp[_0x529a77(0x2ce)](_0xb06d2);},$onceParallel=function(_0x38d31e){const _0x589ec8=_0x193f56;if(SceneManager[_0x589ec8(0x637)]())$scene['playOnceParallelInterpreter'](_0x38d31e);else{if(SceneManager[_0x589ec8(0x80a)]()){if(Imported[_0x589ec8(0x5cd)])$scene[_0x589ec8(0x645)](_0x38d31e);else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x589ec8(0x194));}else $gameTemp&&$gameTemp[_0x589ec8(0x450)]()&&alert(_0x589ec8(0x2ed));}});;StorageManager[_0x193f56(0x525)]=function(_0x3bb161){return new Promise((_0x38ea44,_0x1c593c)=>{const _0x272256=_0x3273;try{const _0x479f00=pako['deflate'](_0x3bb161,{'to':_0x272256(0x82e),'level':0x1});if(_0x479f00[_0x272256(0x8f1)]>=0xc350){}_0x38ea44(_0x479f00);}catch(_0x47855d){if(_0x272256(0x70d)===_0x272256(0x70d))_0x1c593c(_0x47855d);else return _0x6f0e80['CoreEngine'][_0x272256(0x7fe)][_0x272256(0x899)][_0x272256(0x1b8)];}});},TextManager[_0x193f56(0x490)]=['','','','CANCEL','','','HELP','',_0x193f56(0x85d),_0x193f56(0x1f2),'','','CLEAR',_0x193f56(0x883),_0x193f56(0x438),'',_0x193f56(0x3ca),_0x193f56(0x468),'ALT',_0x193f56(0x4aa),'CAPSLOCK',_0x193f56(0x36d),'EISU',_0x193f56(0x3ba),_0x193f56(0x4f9),'HANJA','',_0x193f56(0x49c),_0x193f56(0x38e),'NONCONVERT',_0x193f56(0x7c7),_0x193f56(0x5d9),_0x193f56(0x3c9),'PGUP','PGDN',_0x193f56(0x37f),_0x193f56(0x809),_0x193f56(0x858),'UP',_0x193f56(0x662),'DOWN',_0x193f56(0x32f),_0x193f56(0x67a),_0x193f56(0x593),'PRINTSCREEN',_0x193f56(0x867),_0x193f56(0x484),'','0','1','2','3','4','5','6','7','8','9',_0x193f56(0x3e1),'SEMICOLON',_0x193f56(0x21a),_0x193f56(0x6e5),_0x193f56(0x800),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x193f56(0x7b1),'',_0x193f56(0x51b),_0x193f56(0x6ae),_0x193f56(0x264),_0x193f56(0x538),_0x193f56(0x6e1),_0x193f56(0x644),_0x193f56(0x76a),_0x193f56(0x565),_0x193f56(0x3bd),_0x193f56(0x521),'NUMPAD9','MULTIPLY',_0x193f56(0x70e),_0x193f56(0x45a),_0x193f56(0x6b3),_0x193f56(0x25c),_0x193f56(0x5b9),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x193f56(0x6e9),'F12',_0x193f56(0x6bd),'F14',_0x193f56(0x52d),'F16',_0x193f56(0x603),_0x193f56(0x520),_0x193f56(0x804),_0x193f56(0x243),'F21',_0x193f56(0x5a9),_0x193f56(0x339),_0x193f56(0x8ef),'','','','','','','','',_0x193f56(0x1fe),_0x193f56(0x767),_0x193f56(0x57e),_0x193f56(0x14c),_0x193f56(0x4cb),_0x193f56(0x4b9),_0x193f56(0x8f3),'','','','','','','','','','CIRCUMFLEX',_0x193f56(0x3ee),'DOUBLE_QUOTE',_0x193f56(0x5d1),_0x193f56(0x280),_0x193f56(0x8d3),_0x193f56(0x30b),_0x193f56(0x831),_0x193f56(0x1af),_0x193f56(0x3fa),'ASTERISK',_0x193f56(0x706),_0x193f56(0x70c),'HYPHEN_MINUS',_0x193f56(0x146),'CLOSE_CURLY_BRACKET','TILDE','','','','',_0x193f56(0x23c),_0x193f56(0x249),_0x193f56(0x3a7),'','',_0x193f56(0x24e),_0x193f56(0x6e5),'COMMA',_0x193f56(0x5d7),_0x193f56(0x688),'SLASH','BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x193f56(0x1ad),_0x193f56(0x390),'CLOSE_BRACKET',_0x193f56(0x7b8),'','META',_0x193f56(0x449),'',_0x193f56(0x652),_0x193f56(0x87a),'',_0x193f56(0x7cf),'','',_0x193f56(0x2ab),_0x193f56(0x1b1),'WIN_OEM_PA1',_0x193f56(0x584),_0x193f56(0x47f),_0x193f56(0x432),_0x193f56(0x816),'WIN_OEM_ATTN',_0x193f56(0x4d7),_0x193f56(0x33f),_0x193f56(0x3fb),_0x193f56(0x6ec),_0x193f56(0x1ca),'ATTN',_0x193f56(0x2de),'EXSEL','EREOF','PLAY',_0x193f56(0x2a7),'',_0x193f56(0x839),_0x193f56(0x165),''],TextManager['buttonAssistOk']=VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x5a3)][_0x193f56(0x40b)],TextManager[_0x193f56(0x40e)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x5a3)][_0x193f56(0x5df)],TextManager['buttonAssistSwitch']=VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x5a3)]['SwitchActorText'],VisuMZ['CoreEngine'][_0x193f56(0x4b0)]=TextManager[_0x193f56(0x287)],TextManager[_0x193f56(0x287)]=function(_0x2f4993){const _0x433dcf=_0x193f56;if(typeof _0x2f4993==='number')return _0x433dcf(0x6cf)!==_0x433dcf(0x6cf)?_0x2dab14[_0x433dcf(0x818)][_0x433dcf(0x5c6)][_0x105559]==='integer'?_0x20040c:_0x506cc5((_0x3950db*0x64)[_0x433dcf(0x24c)](_0x3c6a1c))+'%':VisuMZ[_0x433dcf(0x818)][_0x433dcf(0x4b0)][_0x433dcf(0x865)](this,_0x2f4993);else{if('INGLo'!=='vqdmy')return this['paramName'](_0x2f4993);else{if(_0x2b76b1[_0x433dcf(0x818)]['Settings'][_0x433dcf(0x168)][_0x433dcf(0x385)]??!![])for(const _0x2cc140 in _0x4e18c0){const _0x27c948=_0x4ad955[_0x2cc140];_0x27c948['name'][_0x433dcf(0x3d7)](/(.*)\/(.*)/i)&&(_0x27c948[_0x433dcf(0x41f)]=_0x14e0b7(_0x4fc4d7['$2'][_0x433dcf(0x4f6)]()));}}}},TextManager['paramName']=function(_0x3c3a7b){const _0x2a42dd=_0x193f56;_0x3c3a7b=String(_0x3c3a7b||'')[_0x2a42dd(0x125)]();const _0x57157c=VisuMZ[_0x2a42dd(0x818)][_0x2a42dd(0x7fe)][_0x2a42dd(0x14d)];if(_0x3c3a7b===_0x2a42dd(0x5f0))return $dataSystem[_0x2a42dd(0x459)][_0x2a42dd(0x531)][0x0];if(_0x3c3a7b==='MAXMP')return $dataSystem[_0x2a42dd(0x459)][_0x2a42dd(0x531)][0x1];if(_0x3c3a7b===_0x2a42dd(0x1f3))return $dataSystem[_0x2a42dd(0x459)][_0x2a42dd(0x531)][0x2];if(_0x3c3a7b==='DEF')return $dataSystem['terms'][_0x2a42dd(0x531)][0x3];if(_0x3c3a7b===_0x2a42dd(0x1d3))return $dataSystem[_0x2a42dd(0x459)]['params'][0x4];if(_0x3c3a7b===_0x2a42dd(0x5fa))return $dataSystem[_0x2a42dd(0x459)][_0x2a42dd(0x531)][0x5];if(_0x3c3a7b===_0x2a42dd(0x43e))return $dataSystem[_0x2a42dd(0x459)][_0x2a42dd(0x531)][0x6];if(_0x3c3a7b===_0x2a42dd(0x7cd))return $dataSystem[_0x2a42dd(0x459)][_0x2a42dd(0x531)][0x7];if(_0x3c3a7b==='HIT')return _0x57157c[_0x2a42dd(0x879)];if(_0x3c3a7b===_0x2a42dd(0x66f))return _0x57157c[_0x2a42dd(0x1b5)];if(_0x3c3a7b===_0x2a42dd(0x11f))return _0x57157c['XParamVocab2'];if(_0x3c3a7b==='CEV')return _0x57157c[_0x2a42dd(0x3c8)];if(_0x3c3a7b===_0x2a42dd(0x55e))return _0x57157c[_0x2a42dd(0x1cf)];if(_0x3c3a7b===_0x2a42dd(0x4b8))return _0x57157c['XParamVocab5'];if(_0x3c3a7b==='CNT')return _0x57157c['XParamVocab6'];if(_0x3c3a7b===_0x2a42dd(0x2ec))return _0x57157c['XParamVocab7'];if(_0x3c3a7b===_0x2a42dd(0x17d))return _0x57157c['XParamVocab8'];if(_0x3c3a7b===_0x2a42dd(0x3da))return _0x57157c[_0x2a42dd(0x47b)];if(_0x3c3a7b===_0x2a42dd(0x4a4))return _0x57157c[_0x2a42dd(0x16a)];if(_0x3c3a7b===_0x2a42dd(0x211))return _0x57157c[_0x2a42dd(0x2a4)];if(_0x3c3a7b===_0x2a42dd(0x679))return _0x57157c[_0x2a42dd(0x870)];if(_0x3c3a7b===_0x2a42dd(0x290))return _0x57157c[_0x2a42dd(0x5ce)];if(_0x3c3a7b===_0x2a42dd(0x2b2))return _0x57157c['SParamVocab4'];if(_0x3c3a7b===_0x2a42dd(0x82b))return _0x57157c[_0x2a42dd(0x309)];if(_0x3c3a7b===_0x2a42dd(0x6b1))return _0x57157c[_0x2a42dd(0x82c)];if(_0x3c3a7b==='MDR')return _0x57157c[_0x2a42dd(0x1fd)];if(_0x3c3a7b==='FDR')return _0x57157c['SParamVocab8'];if(_0x3c3a7b===_0x2a42dd(0x7d2))return _0x57157c[_0x2a42dd(0x33a)];if(VisuMZ[_0x2a42dd(0x818)][_0x2a42dd(0x640)][_0x3c3a7b])return VisuMZ[_0x2a42dd(0x818)]['CustomParamNames'][_0x3c3a7b];return'';},TextManager[_0x193f56(0x2b6)]=function(_0x32323f){const _0x5ac2d9=_0x193f56;if(_0x32323f==='cancel')_0x32323f=_0x5ac2d9(0x16b);let _0x3771e2=[];for(let _0x255704 in Input[_0x5ac2d9(0x299)]){if(_0x5ac2d9(0x105)!=='dQVPc'){_0x255704=Number(_0x255704);if(_0x255704>=0x60&&_0x255704<=0x69)continue;if([0x12,0x20][_0x5ac2d9(0x267)](_0x255704))continue;if(_0x32323f===Input[_0x5ac2d9(0x299)][_0x255704]){if(_0x5ac2d9(0x200)===_0x5ac2d9(0x2fa)){var _0x1afbda=_0x268435(_0x1a9f9e['$1']);try{_0x54e5ab+=_0x379226(_0x1afbda);}catch(_0x16f7a0){if(_0x51946c[_0x5ac2d9(0x450)]())_0x48a2a7[_0x5ac2d9(0x8d9)](_0x16f7a0);}}else _0x3771e2[_0x5ac2d9(0x8a7)](_0x255704);}}else _0x2bbcfd[_0x5ac2d9(0x415)][_0x5ac2d9(0x1cd)][_0x5ac2d9(0x865)](this),this['setCoreEngineUpdateWindowBg']();}for(let _0x2860b4=0x0;_0x2860b4<_0x3771e2[_0x5ac2d9(0x8f1)];_0x2860b4++){_0x3771e2[_0x2860b4]=TextManager[_0x5ac2d9(0x490)][_0x3771e2[_0x2860b4]];}return this[_0x5ac2d9(0x4df)](_0x3771e2);},TextManager[_0x193f56(0x4df)]=function(_0x59cde4){const _0x4dbdde=_0x193f56,_0x344898=VisuMZ[_0x4dbdde(0x818)][_0x4dbdde(0x7fe)][_0x4dbdde(0x5a3)],_0x5263eb=_0x344898['KeyUnlisted'],_0x5538eb=_0x59cde4[_0x4dbdde(0x81b)](),_0x52ac36='Key%1'['format'](_0x5538eb);return _0x344898[_0x52ac36]?_0x344898[_0x52ac36]:_0x5263eb['format'](_0x5538eb);},TextManager[_0x193f56(0x25e)]=function(_0x19504d,_0x560e25){const _0x4f6e88=_0x193f56,_0x53505b=VisuMZ[_0x4f6e88(0x818)][_0x4f6e88(0x7fe)][_0x4f6e88(0x5a3)],_0x5014a3=_0x53505b[_0x4f6e88(0x322)],_0x31bf25=this['getInputButtonString'](_0x19504d),_0x38d2c5=this[_0x4f6e88(0x2b6)](_0x560e25);return _0x5014a3[_0x4f6e88(0x627)](_0x31bf25,_0x38d2c5);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x32a)]=ColorManager[_0x193f56(0x316)],ColorManager[_0x193f56(0x316)]=function(){const _0xfacca8=_0x193f56;VisuMZ[_0xfacca8(0x818)]['ColorManager_loadWindowskin'][_0xfacca8(0x865)](this),this[_0xfacca8(0x406)]=this['_colorCache']||{};},ColorManager[_0x193f56(0x860)]=function(_0x359249,_0xfddb8){const _0x5932db=_0x193f56;return _0xfddb8=String(_0xfddb8),this[_0x5932db(0x406)]=this[_0x5932db(0x406)]||{},_0xfddb8[_0x5932db(0x3d7)](/#(.*)/i)?this[_0x5932db(0x406)][_0x359249]=_0x5932db(0x28b)[_0x5932db(0x627)](String(RegExp['$1'])):this['_colorCache'][_0x359249]=this[_0x5932db(0x742)](Number(_0xfddb8)),this[_0x5932db(0x406)][_0x359249];},ColorManager[_0x193f56(0x5d0)]=function(_0x1f6be9){const _0x2d9983=_0x193f56;_0x1f6be9=String(_0x1f6be9);if(_0x1f6be9[_0x2d9983(0x3d7)](/#(.*)/i)){if(_0x2d9983(0x634)==='lseOX')_0x2d4d7b=_0x2ede23[_0x2d9983(0x44b)](_0x297453),_0x342230=_0x277ce1[_0x2d9983(0x44b)](_0x294467),_0x590332[_0x2d9983(0x818)][_0x2d9983(0x73f)][_0x2d9983(0x865)](this,_0x91cc49,_0x777710,_0x481575);else return _0x2d9983(0x28b)[_0x2d9983(0x627)](String(RegExp['$1']));}else return this['textColor'](Number(_0x1f6be9));},ColorManager['clearCachedKeys']=function(){const _0x48e16f=_0x193f56;this[_0x48e16f(0x406)]={};},ColorManager[_0x193f56(0x1d5)]=function(){const _0x22ffa4=_0x193f56,_0xca61d5=_0x22ffa4(0x2b7);this['_colorCache']=this[_0x22ffa4(0x406)]||{};if(this['_colorCache'][_0xca61d5])return this['_colorCache'][_0xca61d5];const _0x567e32=VisuMZ[_0x22ffa4(0x818)]['Settings']['Color']['ColorNormal'];return this[_0x22ffa4(0x860)](_0xca61d5,_0x567e32);},ColorManager['systemColor']=function(){const _0x5cee25=_0x193f56,_0x1ea2f0=_0x5cee25(0x2ff);this['_colorCache']=this['_colorCache']||{};if(this[_0x5cee25(0x406)][_0x1ea2f0])return this['_colorCache'][_0x1ea2f0];const _0x2cbdae=VisuMZ[_0x5cee25(0x818)]['Settings']['Color']['ColorSystem'];return this[_0x5cee25(0x860)](_0x1ea2f0,_0x2cbdae);},ColorManager['crisisColor']=function(){const _0x1e1f34=_0x193f56,_0x2dce92=_0x1e1f34(0x88f);this[_0x1e1f34(0x406)]=this[_0x1e1f34(0x406)]||{};if(this[_0x1e1f34(0x406)][_0x2dce92])return this[_0x1e1f34(0x406)][_0x2dce92];const _0x1230a1=VisuMZ['CoreEngine'][_0x1e1f34(0x7fe)]['Color']['ColorCrisis'];return this[_0x1e1f34(0x860)](_0x2dce92,_0x1230a1);},ColorManager[_0x193f56(0x621)]=function(){const _0xc0f626=_0x193f56,_0x389af5=_0xc0f626(0x5d8);this[_0xc0f626(0x406)]=this['_colorCache']||{};if(this[_0xc0f626(0x406)][_0x389af5])return this['_colorCache'][_0x389af5];const _0x330ebf=VisuMZ['CoreEngine'][_0xc0f626(0x7fe)]['Color'][_0xc0f626(0x1ae)];return this[_0xc0f626(0x860)](_0x389af5,_0x330ebf);},ColorManager[_0x193f56(0x62e)]=function(){const _0x5c7edc=_0x193f56,_0x122ece='_stored_gaugeBackColor';this[_0x5c7edc(0x406)]=this[_0x5c7edc(0x406)]||{};if(this[_0x5c7edc(0x406)][_0x122ece])return this[_0x5c7edc(0x406)][_0x122ece];const _0x3d1da8=VisuMZ[_0x5c7edc(0x818)][_0x5c7edc(0x7fe)][_0x5c7edc(0x702)][_0x5c7edc(0x669)];return this[_0x5c7edc(0x860)](_0x122ece,_0x3d1da8);},ColorManager[_0x193f56(0x67b)]=function(){const _0x58ecec=_0x193f56,_0x183f64=_0x58ecec(0x7f2);this[_0x58ecec(0x406)]=this[_0x58ecec(0x406)]||{};if(this[_0x58ecec(0x406)][_0x183f64])return this[_0x58ecec(0x406)][_0x183f64];const _0x1f42fd=VisuMZ[_0x58ecec(0x818)]['Settings'][_0x58ecec(0x702)][_0x58ecec(0x2dc)];return this[_0x58ecec(0x860)](_0x183f64,_0x1f42fd);},ColorManager['hpGaugeColor2']=function(){const _0x180fe4=_0x193f56,_0x488bbc=_0x180fe4(0x38c);this[_0x180fe4(0x406)]=this[_0x180fe4(0x406)]||{};if(this['_colorCache'][_0x488bbc])return this[_0x180fe4(0x406)][_0x488bbc];const _0x49305c=VisuMZ[_0x180fe4(0x818)][_0x180fe4(0x7fe)]['Color']['ColorHPGauge2'];return this[_0x180fe4(0x860)](_0x488bbc,_0x49305c);},ColorManager[_0x193f56(0x310)]=function(){const _0x4ac6d0=_0x193f56,_0x19e6b4='_stored_mpGaugeColor1';this[_0x4ac6d0(0x406)]=this[_0x4ac6d0(0x406)]||{};if(this['_colorCache'][_0x19e6b4])return this['_colorCache'][_0x19e6b4];const _0x1ec1ca=VisuMZ['CoreEngine'][_0x4ac6d0(0x7fe)][_0x4ac6d0(0x702)]['ColorMPGauge1'];return this[_0x4ac6d0(0x860)](_0x19e6b4,_0x1ec1ca);},ColorManager[_0x193f56(0x47e)]=function(){const _0x304478=_0x193f56,_0x2b9dd1='_stored_mpGaugeColor2';this[_0x304478(0x406)]=this['_colorCache']||{};if(this['_colorCache'][_0x2b9dd1])return this[_0x304478(0x406)][_0x2b9dd1];const _0xf8f26=VisuMZ[_0x304478(0x818)][_0x304478(0x7fe)]['Color'][_0x304478(0x445)];return this[_0x304478(0x860)](_0x2b9dd1,_0xf8f26);},ColorManager[_0x193f56(0x653)]=function(){const _0x23743c=_0x193f56,_0x2ee8c6=_0x23743c(0x509);this['_colorCache']=this[_0x23743c(0x406)]||{};if(this['_colorCache'][_0x2ee8c6])return this[_0x23743c(0x406)][_0x2ee8c6];const _0x2df6b4=VisuMZ['CoreEngine'][_0x23743c(0x7fe)][_0x23743c(0x702)][_0x23743c(0x532)];return this[_0x23743c(0x860)](_0x2ee8c6,_0x2df6b4);},ColorManager[_0x193f56(0x427)]=function(){const _0x26e114=_0x193f56,_0x41ffa8=_0x26e114(0x649);this['_colorCache']=this[_0x26e114(0x406)]||{};if(this['_colorCache'][_0x41ffa8])return this[_0x26e114(0x406)][_0x41ffa8];const _0x54b340=VisuMZ[_0x26e114(0x818)][_0x26e114(0x7fe)][_0x26e114(0x702)][_0x26e114(0x240)];return this[_0x26e114(0x860)](_0x41ffa8,_0x54b340);},ColorManager['powerDownColor']=function(){const _0x4a5308=_0x193f56,_0x54ede0=_0x4a5308(0x576);this[_0x4a5308(0x406)]=this[_0x4a5308(0x406)]||{};if(this[_0x4a5308(0x406)][_0x54ede0])return this[_0x4a5308(0x406)][_0x54ede0];const _0x225960=VisuMZ[_0x4a5308(0x818)]['Settings'][_0x4a5308(0x702)][_0x4a5308(0x6dc)];return this[_0x4a5308(0x860)](_0x54ede0,_0x225960);},ColorManager['ctGaugeColor1']=function(){const _0x5c9333=_0x193f56,_0x5e61d8=_0x5c9333(0x4d1);this[_0x5c9333(0x406)]=this[_0x5c9333(0x406)]||{};if(this[_0x5c9333(0x406)][_0x5e61d8])return this['_colorCache'][_0x5e61d8];const _0x1e05ed=VisuMZ[_0x5c9333(0x818)][_0x5c9333(0x7fe)]['Color'][_0x5c9333(0x730)];return this['getColorDataFromPluginParameters'](_0x5e61d8,_0x1e05ed);},ColorManager['ctGaugeColor2']=function(){const _0x20501b=_0x193f56,_0x4f9bdb=_0x20501b(0x205);this[_0x20501b(0x406)]=this[_0x20501b(0x406)]||{};if(this[_0x20501b(0x406)][_0x4f9bdb])return this['_colorCache'][_0x4f9bdb];const _0x3f0f6d=VisuMZ['CoreEngine'][_0x20501b(0x7fe)][_0x20501b(0x702)][_0x20501b(0x4db)];return this[_0x20501b(0x860)](_0x4f9bdb,_0x3f0f6d);},ColorManager['tpGaugeColor1']=function(){const _0x234a7e=_0x193f56,_0x3d1b4b='_stored_tpGaugeColor1';this['_colorCache']=this[_0x234a7e(0x406)]||{};if(this[_0x234a7e(0x406)][_0x3d1b4b])return this[_0x234a7e(0x406)][_0x3d1b4b];const _0x386d8b=VisuMZ[_0x234a7e(0x818)][_0x234a7e(0x7fe)][_0x234a7e(0x702)][_0x234a7e(0x14e)];return this[_0x234a7e(0x860)](_0x3d1b4b,_0x386d8b);},ColorManager[_0x193f56(0x4ca)]=function(){const _0x56b99d=_0x193f56,_0x53fa2a=_0x56b99d(0x58b);this['_colorCache']=this[_0x56b99d(0x406)]||{};if(this[_0x56b99d(0x406)][_0x53fa2a])return this['_colorCache'][_0x53fa2a];const _0x2a5ea8=VisuMZ[_0x56b99d(0x818)]['Settings'][_0x56b99d(0x702)][_0x56b99d(0x86f)];return this[_0x56b99d(0x860)](_0x53fa2a,_0x2a5ea8);},ColorManager[_0x193f56(0x529)]=function(){const _0x55184d=_0x193f56,_0x3c73f9=_0x55184d(0x21e);this[_0x55184d(0x406)]=this[_0x55184d(0x406)]||{};if(this['_colorCache'][_0x3c73f9])return this[_0x55184d(0x406)][_0x3c73f9];const _0x571f49=VisuMZ['CoreEngine'][_0x55184d(0x7fe)][_0x55184d(0x702)][_0x55184d(0x5c9)];return this[_0x55184d(0x860)](_0x3c73f9,_0x571f49);},ColorManager['pendingColor']=function(){const _0x5920bf=_0x193f56,_0x4d8e9a=_0x5920bf(0x78e);this[_0x5920bf(0x406)]=this['_colorCache']||{};if(this['_colorCache'][_0x4d8e9a])return this['_colorCache'][_0x4d8e9a];const _0x4feb58=VisuMZ['CoreEngine']['Settings'][_0x5920bf(0x702)][_0x5920bf(0x5c9)];return this['getColorDataFromPluginParameters'](_0x4d8e9a,_0x4feb58);},ColorManager[_0x193f56(0x88c)]=function(){const _0x20059b=_0x193f56,_0x21a8fe=_0x20059b(0x1e1);this[_0x20059b(0x406)]=this[_0x20059b(0x406)]||{};if(this[_0x20059b(0x406)][_0x21a8fe])return this[_0x20059b(0x406)][_0x21a8fe];const _0x4cffcf=VisuMZ[_0x20059b(0x818)][_0x20059b(0x7fe)][_0x20059b(0x702)]['ColorExpGauge1'];return this[_0x20059b(0x860)](_0x21a8fe,_0x4cffcf);},ColorManager[_0x193f56(0x315)]=function(){const _0x209615=_0x193f56,_0x2c7fe9=_0x209615(0x444);this[_0x209615(0x406)]=this[_0x209615(0x406)]||{};if(this[_0x209615(0x406)][_0x2c7fe9])return this['_colorCache'][_0x2c7fe9];const _0x12e047=VisuMZ[_0x209615(0x818)][_0x209615(0x7fe)][_0x209615(0x702)][_0x209615(0x4c0)];return this['getColorDataFromPluginParameters'](_0x2c7fe9,_0x12e047);},ColorManager['maxLvGaugeColor1']=function(){const _0x8242e3=_0x193f56,_0x4c87aa='_stored_maxLvGaugeColor1';this[_0x8242e3(0x406)]=this[_0x8242e3(0x406)]||{};if(this[_0x8242e3(0x406)][_0x4c87aa])return this[_0x8242e3(0x406)][_0x4c87aa];const _0x48cd0c=VisuMZ[_0x8242e3(0x818)][_0x8242e3(0x7fe)]['Color'][_0x8242e3(0x114)];return this['getColorDataFromPluginParameters'](_0x4c87aa,_0x48cd0c);},ColorManager[_0x193f56(0x3e4)]=function(){const _0x2deca4=_0x193f56,_0x3a3273=_0x2deca4(0x476);this['_colorCache']=this['_colorCache']||{};if(this[_0x2deca4(0x406)][_0x3a3273])return this[_0x2deca4(0x406)][_0x3a3273];const _0x5a83b6=VisuMZ[_0x2deca4(0x818)][_0x2deca4(0x7fe)]['Color'][_0x2deca4(0x764)];return this[_0x2deca4(0x860)](_0x3a3273,_0x5a83b6);},ColorManager['hpColor']=function(_0x4705c2){const _0x5d7d30=_0x193f56;return VisuMZ[_0x5d7d30(0x818)]['Settings'][_0x5d7d30(0x702)][_0x5d7d30(0x6f4)][_0x5d7d30(0x865)](this,_0x4705c2);},ColorManager[_0x193f56(0x79a)]=function(_0x377c5f){const _0x1cd532=_0x193f56;return VisuMZ[_0x1cd532(0x818)][_0x1cd532(0x7fe)][_0x1cd532(0x702)][_0x1cd532(0x4c8)][_0x1cd532(0x865)](this,_0x377c5f);},ColorManager[_0x193f56(0x239)]=function(_0x3fcaed){const _0xfecde7=_0x193f56;return VisuMZ[_0xfecde7(0x818)][_0xfecde7(0x7fe)][_0xfecde7(0x702)][_0xfecde7(0x448)][_0xfecde7(0x865)](this,_0x3fcaed);},ColorManager[_0x193f56(0x6f9)]=function(_0x4aff7e){const _0x8a1f2e=_0x193f56;return VisuMZ['CoreEngine']['Settings'][_0x8a1f2e(0x702)][_0x8a1f2e(0x718)][_0x8a1f2e(0x865)](this,_0x4aff7e);},ColorManager[_0x193f56(0x36c)]=function(_0x4e5a6e){const _0x4ce9ee=_0x193f56;return VisuMZ['CoreEngine'][_0x4ce9ee(0x7fe)][_0x4ce9ee(0x702)][_0x4ce9ee(0x6da)][_0x4ce9ee(0x865)](this,_0x4e5a6e);},ColorManager[_0x193f56(0x4f5)]=function(){const _0x36efd2=_0x193f56;return VisuMZ[_0x36efd2(0x818)][_0x36efd2(0x7fe)][_0x36efd2(0x702)][_0x36efd2(0x780)];},ColorManager['outlineColorDmg']=function(){const _0x4b52a3=_0x193f56;return VisuMZ['CoreEngine'][_0x4b52a3(0x7fe)][_0x4b52a3(0x702)][_0x4b52a3(0x7bf)]||_0x4b52a3(0x6eb);},ColorManager[_0x193f56(0x3b0)]=function(){const _0x3bc0eb=_0x193f56;return VisuMZ[_0x3bc0eb(0x818)][_0x3bc0eb(0x7fe)]['Color']['OutlineColorGauge']||_0x3bc0eb(0x5fe);},ColorManager[_0x193f56(0x1c9)]=function(){const _0x412630=_0x193f56;return VisuMZ['CoreEngine'][_0x412630(0x7fe)][_0x412630(0x702)][_0x412630(0x153)];},ColorManager[_0x193f56(0x462)]=function(){const _0x9fb15e=_0x193f56;return VisuMZ[_0x9fb15e(0x818)][_0x9fb15e(0x7fe)]['Color'][_0x9fb15e(0x7c9)];},ColorManager['itemBackColor1']=function(){const _0x355422=_0x193f56;return VisuMZ[_0x355422(0x818)][_0x355422(0x7fe)][_0x355422(0x702)][_0x355422(0x3a0)];},ColorManager['itemBackColor2']=function(){const _0x6753fd=_0x193f56;return VisuMZ[_0x6753fd(0x818)][_0x6753fd(0x7fe)][_0x6753fd(0x702)][_0x6753fd(0x601)];},SceneManager['_storedStack']=[],SceneManager[_0x193f56(0x80a)]=function(){const _0x522558=_0x193f56;return this[_0x522558(0x87f)]&&this[_0x522558(0x87f)][_0x522558(0x1a6)]===Scene_Battle;},SceneManager[_0x193f56(0x637)]=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x33a3ae=_0x193f56;return this['_scene']&&this[_0x33a3ae(0x87f)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x193f56(0x2d9)]=SceneManager[_0x193f56(0x7c5)],SceneManager[_0x193f56(0x7c5)]=function(){const _0x5152b3=_0x193f56;VisuMZ[_0x5152b3(0x818)][_0x5152b3(0x2d9)][_0x5152b3(0x865)](this),this[_0x5152b3(0x298)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x510)]=SceneManager[_0x193f56(0x4be)],SceneManager[_0x193f56(0x4be)]=function(_0x4e00d6){const _0x4c4c13=_0x193f56;if($gameTemp)this['onKeyDownKeysF6F7'](_0x4e00d6);VisuMZ[_0x4c4c13(0x818)][_0x4c4c13(0x510)][_0x4c4c13(0x865)](this,_0x4e00d6);},SceneManager[_0x193f56(0x275)]=function(_0x28fb03){const _0x582d4e=_0x193f56;if(!_0x28fb03[_0x582d4e(0x63b)]&&!_0x28fb03['altKey']){if(_0x582d4e(0x247)===_0x582d4e(0x247))switch(_0x28fb03[_0x582d4e(0x6ef)]){case 0x54:this[_0x582d4e(0x723)]();break;case 0x75:this[_0x582d4e(0x755)]();break;case 0x76:if(Input[_0x582d4e(0x53a)](_0x582d4e(0x73a))||Input[_0x582d4e(0x53a)]('ctrl'))return;this[_0x582d4e(0x111)]();break;}else _0x5e7fce+=_0x13bf21+_0x582d4e(0x178);}},SceneManager['playTestF6']=function(){const _0x5a91e6=_0x193f56;if($gameTemp[_0x5a91e6(0x450)]()&&VisuMZ[_0x5a91e6(0x818)][_0x5a91e6(0x7fe)]['QoL'][_0x5a91e6(0x81e)]){if(ConfigManager[_0x5a91e6(0x548)]!==0x0)ConfigManager['bgmVolume']=0x0,ConfigManager[_0x5a91e6(0x1df)]=0x0,ConfigManager[_0x5a91e6(0x8ee)]=0x0,ConfigManager['seVolume']=0x0;else{if(_0x5a91e6(0x295)==='hybpK'){this[_0x5a91e6(0x3cf)]=_0x318e53[_0x5a91e6(0x6ef)];let _0x2e67c2=_0x35c716['fromCharCode'](_0x1113a0['charCode']);this[_0x5a91e6(0x805)]===_0x110d97?this[_0x5a91e6(0x805)]=_0x2e67c2:this['_inputString']+=_0x2e67c2;}else ConfigManager['bgmVolume']=0x64,ConfigManager[_0x5a91e6(0x1df)]=0x64,ConfigManager[_0x5a91e6(0x8ee)]=0x64,ConfigManager['seVolume']=0x64;}ConfigManager['save']();if(this[_0x5a91e6(0x87f)][_0x5a91e6(0x1a6)]===Scene_Options){if(this[_0x5a91e6(0x87f)][_0x5a91e6(0x80b)])this['_scene'][_0x5a91e6(0x80b)]['refresh']();if(this[_0x5a91e6(0x87f)][_0x5a91e6(0x5ee)])this['_scene'][_0x5a91e6(0x5ee)][_0x5a91e6(0x197)]();}}},SceneManager[_0x193f56(0x111)]=function(){const _0x218d69=_0x193f56;$gameTemp[_0x218d69(0x450)]()&&VisuMZ[_0x218d69(0x818)][_0x218d69(0x7fe)][_0x218d69(0x168)][_0x218d69(0x118)]&&($gameTemp[_0x218d69(0x116)]=!$gameTemp[_0x218d69(0x116)]);},SceneManager[_0x193f56(0x723)]=function(){const _0x8b58f3=_0x193f56;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x8b58f3(0x80a)]())return;for(const _0x5a814d of $gameParty[_0x8b58f3(0x382)]()){if(!_0x5a814d)continue;_0x5a814d[_0x8b58f3(0x83f)](_0x5a814d[_0x8b58f3(0x861)]());}},SceneManager[_0x193f56(0x298)]=function(){const _0x4977ad=_0x193f56;this[_0x4977ad(0x2e7)]=![],this[_0x4977ad(0x82d)]=!VisuMZ[_0x4977ad(0x818)][_0x4977ad(0x7fe)]['UI']['ShowButtons'];},SceneManager['setSideButtonLayout']=function(_0x1e6134){const _0xbfa78e=_0x193f56;VisuMZ['CoreEngine'][_0xbfa78e(0x7fe)]['UI'][_0xbfa78e(0x317)]&&(this[_0xbfa78e(0x2e7)]=_0x1e6134);},SceneManager[_0x193f56(0x434)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x193f56(0x135)]=function(){return this['_hideButtons'];},SceneManager[_0x193f56(0x69e)]=function(){const _0x4eb63b=_0x193f56;return this['areButtonsHidden']()||this[_0x4eb63b(0x434)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x6f3)]=SceneManager[_0x193f56(0x684)],SceneManager['isGameActive']=function(){const _0x4661=_0x193f56;return VisuMZ[_0x4661(0x818)][_0x4661(0x7fe)]['QoL'][_0x4661(0x516)]?VisuMZ[_0x4661(0x818)][_0x4661(0x6f3)][_0x4661(0x865)](this):!![];},SceneManager[_0x193f56(0x357)]=function(_0xf762f8){const _0x425193=_0x193f56;if(_0xf762f8 instanceof Error)this['catchNormalError'](_0xf762f8);else _0xf762f8 instanceof Array&&_0xf762f8[0x0]===_0x425193(0x54c)?this[_0x425193(0x8f2)](_0xf762f8):this['catchUnknownError'](_0xf762f8);this[_0x425193(0x54b)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x76d)]=SceneManager[_0x193f56(0x6c0)],SceneManager[_0x193f56(0x6c0)]=function(){const _0x57b4d3=_0x193f56;VisuMZ['CoreEngine'][_0x57b4d3(0x76d)][_0x57b4d3(0x865)](this);if(Utils['RPGMAKER_VERSION']>=_0x57b4d3(0x6a9)){if(_0x57b4d3(0x1c7)===_0x57b4d3(0x1c7)){if(typeof nw===_0x57b4d3(0x574))nw['App'][_0x57b4d3(0x2cd)]();}else{if(this['_mode']===_0x57b4d3(0x35e))return;if(_0x146277[_0x57b4d3(0x783)]())return;_0x5a1e0d[_0x57b4d3(0x818)]['Window_NameInput_cursorPageup'][_0x57b4d3(0x865)](this),this[_0x57b4d3(0x486)]('default');}}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x159)]=BattleManager[_0x193f56(0x32b)],BattleManager[_0x193f56(0x32b)]=function(){const _0xbeae03=_0x193f56;if(VisuMZ[_0xbeae03(0x818)][_0xbeae03(0x7fe)]['QoL'][_0xbeae03(0x693)]){if('FXVGZ'==='sGoic'){const _0x2d69b2=this[_0xbeae03(0x41f)](),_0x4e2f96=this[_0xbeae03(0x7dc)](),_0x38b48e=this[_0xbeae03(0x80d)]();this[_0xbeae03(0x26b)](),this[_0xbeae03(0x481)][_0xbeae03(0x418)](),this[_0xbeae03(0x481)][_0xbeae03(0x841)](_0x2d69b2,0x0,0x0,_0x4e2f96,_0x38b48e,'left');}else this[_0xbeae03(0x389)]();}else{if(_0xbeae03(0x786)===_0xbeae03(0x667)){this[_0xbeae03(0x101)]++;let _0x363d12=_0x2fa498['CoreEngine'][_0xbeae03(0x572)](_0x2b06a6[_0xbeae03(0x440)]);_0x363d12[_0xbeae03(0x8f1)]>0x0&&(_0x23a397+=_0x5db1bf,_0x35f726+=_0x24c345,_0x1e33df+=_0xbeae03(0x7bd)[_0xbeae03(0x627)](_0x1dba57['id'],_0x11744e['name']),_0x10198f+=_0x5b1588,_0xbd8c31+=_0x363d12,_0x12a2c9+=_0x2add52,_0x2bc747+=_0xbeae03(0x74b)[_0xbeae03(0x627)](_0x2ae3d0['id'],_0x3aa015[_0xbeae03(0x41f)]),_0x469609+=_0x5e8162),this[_0xbeae03(0x101)]--;}else return VisuMZ[_0xbeae03(0x818)][_0xbeae03(0x159)][_0xbeae03(0x865)](this);}},BattleManager[_0x193f56(0x389)]=function(){const _0x91a2b4=_0x193f56;return $gameParty[_0x91a2b4(0x6de)](),SoundManager[_0x91a2b4(0x67d)](),this[_0x91a2b4(0x325)](),!![];},BattleManager[_0x193f56(0x416)]=function(){const _0x474727=_0x193f56;return $gameSystem[_0x474727(0x4b3)]()>=0x1;},BattleManager[_0x193f56(0x7d7)]=function(){const _0x34f380=_0x193f56;return $gameSystem[_0x34f380(0x4b3)]()===0x1;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x56d)]=Game_Temp['prototype'][_0x193f56(0x7c5)],Game_Temp[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(){const _0x26941e=_0x193f56;VisuMZ[_0x26941e(0x818)][_0x26941e(0x56d)][_0x26941e(0x865)](this),this[_0x26941e(0x324)](),this['createFauxAnimationQueue'](),this['createPointAnimationQueue']();},Game_Temp['prototype'][_0x193f56(0x324)]=function(){const _0x5119ea=_0x193f56;VisuMZ['CoreEngine'][_0x5119ea(0x7fe)][_0x5119ea(0x168)][_0x5119ea(0x2c8)]&&(this[_0x5119ea(0x17a)]=![]);},Game_Temp[_0x193f56(0x415)][_0x193f56(0x798)]=function(_0x2660ed){const _0x48d1c1=_0x193f56;this[_0x48d1c1(0x1bc)]=_0x2660ed;},Game_Temp[_0x193f56(0x415)][_0x193f56(0x724)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x193f56(0x415)][_0x193f56(0x705)]=function(){const _0x189a88=_0x193f56;this[_0x189a88(0x1e7)]=undefined,this[_0x189a88(0x65f)]=undefined;},Game_Temp[_0x193f56(0x415)][_0x193f56(0x59d)]=function(_0x17728a){const _0x5caeb1=_0x193f56;$gameMap&&$dataMap&&$dataMap[_0x5caeb1(0x365)]&&this[_0x5caeb1(0x475)]($dataMap[_0x5caeb1(0x365)]);const _0x54ea94=$dataTroops[_0x17728a];if(_0x54ea94){let _0x331501=DataManager['createTroopNote'](_0x54ea94['id']);this[_0x5caeb1(0x475)](_0x331501);}},Game_Temp[_0x193f56(0x415)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x53cf67){const _0x336cec=_0x193f56;if(!_0x53cf67)return;if(_0x53cf67[_0x336cec(0x3d7)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if(_0x336cec(0x527)!==_0x336cec(0x527)){var _0x8212ee=_0x471421(_0xcf1eb8['$1']);try{_0x307631=_0x282c86['max'](_0x303a3e,_0x4ba1a3(_0x499693(_0x8212ee)));}catch(_0x583db0){if(_0x5e3db1[_0x336cec(0x450)]())_0x41c14a[_0x336cec(0x8d9)](_0x583db0);}}else this[_0x336cec(0x1e7)]='FV';}else{if(_0x53cf67['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x336cec(0x1e7)]='SV';else{if(_0x53cf67['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('qDdnS'===_0x336cec(0x3c5)){const _0x17e30a=String(RegExp['$1']);if(_0x17e30a[_0x336cec(0x3d7)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x17e30a[_0x336cec(0x3d7)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}else _0x3095c0=_0x55927d(_0x5ea3a3['$1'])*_0x180032[_0x336cec(0x890)],_0x11204a=(0x1-_0x529b32(_0x20c9f9['$2']))*-_0x498a17;}}}if(_0x53cf67[_0x336cec(0x3d7)](/<(?:DTB)>/i))this[_0x336cec(0x65f)]=0x0;else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x336cec(0x48e)==='Nlzuz')return _0x29c08e[_0x336cec(0x818)][_0x336cec(0x7fe)]['UI']['FadeSpeed'];else this[_0x336cec(0x65f)]=0x1;}else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:TPB|ATB)[ ]WAIT>/i)){if('NHDSZ'==='rnlCa'){if(_0x3dc512['currencyUnit']!==this['currencyUnit']())return![];return _0x365a53['CoreEngine'][_0x336cec(0x7fe)]['Gold'][_0x336cec(0x75e)];}else this['_forcedBattleSys']=0x2;}else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:CTB)>/i)){if(_0x336cec(0x7a3)===_0x336cec(0x58c)){const _0x5c05b2=_0x53006a[_0x336cec(0x890)]-_0x1a570d[_0x336cec(0x474)]-_0x3d18a2['CoreEngine']['Settings']['UI'][_0x336cec(0x89b)]*0x2,_0x350af3=_0x24d70d[_0x336cec(0x415)][_0x336cec(0x7e9)][_0x336cec(0x865)](this)*0x4;if(_0x5c05b2>=_0x350af3)_0x5e9908['setSideButtonLayout'](!![]);}else{if(Imported[_0x336cec(0x19e)]){if(_0x336cec(0x26f)!==_0x336cec(0x26f)){if(!this[_0x336cec(0x2d1)]())return;const _0x3902a1=this['buttonAssistWindowRect']();this[_0x336cec(0x7ab)]=new _0x4e979e(_0x3902a1),this[_0x336cec(0x835)](this[_0x336cec(0x7ab)]);}else this[_0x336cec(0x65f)]='CTB';}}}else{if(_0x53cf67['match'](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x336cec(0x65f)]=_0x336cec(0x182));else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x336cec(0x65f)]=_0x336cec(0x694));else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:FTB)>/i))Imported[_0x336cec(0x842)]&&(this['_forcedBattleSys']=_0x336cec(0x43c));else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this['_forcedBattleSys']='OTB');else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x336cec(0x65f)]=_0x336cec(0x65e));else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:PTB)>/i))Imported[_0x336cec(0x811)]&&(this['_forcedBattleSys']='PTB');else{if(_0x53cf67[_0x336cec(0x3d7)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x17ccf9=String(RegExp['$1']);if(_0x17ccf9[_0x336cec(0x3d7)](/DTB/i))this[_0x336cec(0x65f)]=0x0;else{if(_0x17ccf9['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x336cec(0x65f)]=0x1;else{if(_0x17ccf9[_0x336cec(0x3d7)](/(?:TPB|ATB)[ ]WAIT/i)){if(_0x336cec(0x553)===_0x336cec(0x172)){var _0x3c2e3c=_0x1dc987(_0xa13e5c['$1']);_0x39389e*=_0x3c2e3c;}else this[_0x336cec(0x65f)]=0x2;}else{if(_0x17ccf9[_0x336cec(0x3d7)](/CTB/i)){if('gUcxV'!=='KfQWM'){if(Imported[_0x336cec(0x19e)]){if(_0x336cec(0x778)===_0x336cec(0x30d))return _0x245a15[_0x336cec(0x818)][_0x336cec(0x7fe)][_0x336cec(0x5a3)][_0x336cec(0x29a)];else this[_0x336cec(0x65f)]='CTB';}}else _0x30c52d['CoreEngine'][_0x336cec(0x8f5)][_0x336cec(0x865)](this),_0x4476a9=this[_0x336cec(0x3f1)];}else{if(_0x17ccf9['match'](/STB/i))Imported[_0x336cec(0x478)]&&(this['_forcedBattleSys']='STB');else{if(_0x17ccf9[_0x336cec(0x3d7)](/BTB/i)){if('XLtXL'===_0x336cec(0x4c1))this[_0x336cec(0x8ce)]();else{if(Imported[_0x336cec(0x7a1)]){if(_0x336cec(0x843)!==_0x336cec(0x843)){if(this[_0x336cec(0x13e)](_0x4d5a5c))return!![];}else this[_0x336cec(0x65f)]=_0x336cec(0x694);}}}else{if(_0x17ccf9[_0x336cec(0x3d7)](/FTB/i))Imported[_0x336cec(0x842)]&&(this[_0x336cec(0x65f)]='FTB');else{if(_0x17ccf9['match'](/OTB/i))Imported[_0x336cec(0x722)]&&(this[_0x336cec(0x65f)]=_0x336cec(0x752));else{if(_0x17ccf9[_0x336cec(0x3d7)](/ETB/i))Imported[_0x336cec(0x232)]&&(this[_0x336cec(0x65f)]=_0x336cec(0x65e));else _0x17ccf9[_0x336cec(0x3d7)](/PTB/i)&&(Imported['VisuMZ_2_BattleSystemPTB']&&('wIylg'!=='sRvbK'?this['_forcedBattleSys']=_0x336cec(0x6e2):(_0x4b3355+=_0xe702ba,_0x17d861+=_0x336cec(0x283)['format'](_0x1dc1d2,_0x556605[_0x336cec(0x65a)][0x0]+0x1,_0x1f0d36[_0x336cec(0x65a)][0x1]))));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x193f56(0x415)][_0x193f56(0x218)]=function(){const _0x52e25b=_0x193f56;this[_0x52e25b(0x5a2)]=[];},Game_Temp[_0x193f56(0x415)][_0x193f56(0x6a7)]=function(_0x3a3b33,_0x81d315,_0xdaa2ae,_0x275407){const _0x2db85d=_0x193f56;if(!this[_0x2db85d(0x2c9)]())return;_0xdaa2ae=_0xdaa2ae||![],_0x275407=_0x275407||![];if($dataAnimations[_0x81d315]){if('OnPYx'!==_0x2db85d(0x2ba))this[_0x2db85d(0x514)]=new _0x453c8f[(_0x2db85d(0x4fe))][(_0x2db85d(0x50e))](_0x4b9f63=!![]),this[_0x2db85d(0x4bb)]=new _0x5b20e0(),this['_backgroundSprite'][_0x2db85d(0x481)]=_0x2c4966[_0x2db85d(0x272)](),this[_0x2db85d(0x4bb)]['filters']=[this['_backgroundFilter']],this[_0x2db85d(0x6a3)](this[_0x2db85d(0x4bb)]),this['setBackgroundOpacity'](0xc0),this[_0x2db85d(0x437)](this[_0x2db85d(0x166)]()),this[_0x2db85d(0x513)]();else{const _0x21154c={'targets':_0x3a3b33,'animationId':_0x81d315,'mirror':_0xdaa2ae,'mute':_0x275407};this[_0x2db85d(0x5a2)]['push'](_0x21154c);for(const _0x58c8b7 of _0x3a3b33){_0x58c8b7[_0x2db85d(0x8cc)]&&_0x58c8b7[_0x2db85d(0x8cc)]();}}}},Game_Temp[_0x193f56(0x415)][_0x193f56(0x2c9)]=function(){return!![];},Game_Temp[_0x193f56(0x415)][_0x193f56(0x4fb)]=function(){const _0x110763=_0x193f56;return this[_0x110763(0x5a2)][_0x110763(0x73a)]();},Game_Temp['prototype']['createPointAnimationQueue']=function(){const _0x45d79f=_0x193f56;this[_0x45d79f(0x304)]=[];},Game_Temp['prototype']['requestPointAnimation']=function(_0x3f4064,_0x5ce026,_0x2a598e,_0x42f102,_0x3a693a){const _0x5f5d1e=_0x193f56;if(!this[_0x5f5d1e(0x600)]())return;_0x42f102=_0x42f102||![],_0x3a693a=_0x3a693a||![];if($dataAnimations[_0x2a598e]){const _0x391a84={'x':_0x3f4064,'y':_0x5ce026,'animationId':_0x2a598e,'mirror':_0x42f102,'mute':_0x3a693a};this[_0x5f5d1e(0x304)]['push'](_0x391a84);}},Game_Temp['prototype']['showPointAnimations']=function(){return!![];},Game_Temp[_0x193f56(0x415)][_0x193f56(0x15c)]=function(){const _0x27ac49=_0x193f56;return this[_0x27ac49(0x304)][_0x27ac49(0x73a)]();},VisuMZ['CoreEngine'][_0x193f56(0x539)]=Game_System[_0x193f56(0x415)][_0x193f56(0x7c5)],Game_System[_0x193f56(0x415)]['initialize']=function(){const _0x586e20=_0x193f56;VisuMZ['CoreEngine'][_0x586e20(0x539)][_0x586e20(0x865)](this),this['initCoreEngine']();},Game_System[_0x193f56(0x415)][_0x193f56(0x466)]=function(){const _0x206a9a=_0x193f56;this[_0x206a9a(0x3a4)]={'SideView':$dataSystem[_0x206a9a(0x1cb)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem[_0x206a9a(0x72c)][_0x206a9a(0x5dd)],'Padding':0xc};},Game_System['prototype'][_0x193f56(0x88b)]=function(){const _0x11ddd1=_0x193f56;if($gameTemp[_0x11ddd1(0x1e7)]==='SV'){if(_0x11ddd1(0x8ea)!==_0x11ddd1(0x8ea)){const _0x5c65be=_0x196073[_0x11ddd1(0x4cd)]()['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0xcc216d[_0x11ddd1(0x4cd)](),_0x459917,_0x59a8a9,_0x49d8fb);}else return!![];}else{if($gameTemp[_0x11ddd1(0x1e7)]==='FV')return![];}if(this[_0x11ddd1(0x3a4)]===undefined)this[_0x11ddd1(0x466)]();if(this[_0x11ddd1(0x3a4)][_0x11ddd1(0x81f)]===undefined)this[_0x11ddd1(0x466)]();return this[_0x11ddd1(0x3a4)][_0x11ddd1(0x81f)];},Game_System['prototype'][_0x193f56(0x224)]=function(_0x1ad2f2){const _0x3699a4=_0x193f56;if(this[_0x3699a4(0x3a4)]===undefined)this[_0x3699a4(0x466)]();if(this[_0x3699a4(0x3a4)][_0x3699a4(0x81f)]===undefined)this[_0x3699a4(0x466)]();this['_CoreEngineSettings'][_0x3699a4(0x81f)]=_0x1ad2f2;},Game_System['prototype'][_0x193f56(0x61b)]=function(){const _0xbcd713=_0x193f56;if(this[_0xbcd713(0x3a4)]===undefined)this['initCoreEngine']();this[_0xbcd713(0x3a4)][_0xbcd713(0x8c9)]=this[_0xbcd713(0x577)]();},Game_System[_0x193f56(0x415)][_0x193f56(0x577)]=function(){const _0x4df21c=_0x193f56,_0xa93e55=(VisuMZ[_0x4df21c(0x818)][_0x4df21c(0x7fe)][_0x4df21c(0x8c9)]||_0x4df21c(0x5da))[_0x4df21c(0x125)]()['trim']();return VisuMZ[_0x4df21c(0x818)][_0x4df21c(0x5d5)](_0xa93e55);},Game_System['prototype']['getBattleSystem']=function(){const _0x5c2c01=_0x193f56;if($gameTemp[_0x5c2c01(0x65f)]!==undefined)return $gameTemp[_0x5c2c01(0x65f)];if(this[_0x5c2c01(0x3a4)]===undefined)this[_0x5c2c01(0x466)]();if(this[_0x5c2c01(0x3a4)][_0x5c2c01(0x8c9)]===undefined)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0x5c2c01(0x8c9)];},Game_System[_0x193f56(0x415)][_0x193f56(0x7a9)]=function(_0x3d7ea6){const _0x170976=_0x193f56;if(this[_0x170976(0x3a4)]===undefined)this[_0x170976(0x466)]();if(this['_CoreEngineSettings'][_0x170976(0x8c9)]===undefined)this['resetBattleSystem']();this[_0x170976(0x3a4)][_0x170976(0x8c9)]=_0x3d7ea6;},Game_System[_0x193f56(0x415)][_0x193f56(0x79d)]=function(){const _0x8649f2=_0x193f56;if(this[_0x8649f2(0x3a4)]===undefined)this['initCoreEngine']();if(this[_0x8649f2(0x3a4)][_0x8649f2(0x2fc)]===undefined)this[_0x8649f2(0x466)]();return this['_CoreEngineSettings'][_0x8649f2(0x2fc)];},Game_System[_0x193f56(0x415)][_0x193f56(0x238)]=function(_0x52ca2b){const _0x15b7c2=_0x193f56;if(this[_0x15b7c2(0x3a4)]===undefined)this[_0x15b7c2(0x466)]();if(this[_0x15b7c2(0x3a4)][_0x15b7c2(0x7e3)]===undefined)this['initCoreEngine']();this[_0x15b7c2(0x3a4)]['FontSize']=_0x52ca2b;},Game_System[_0x193f56(0x415)]['windowPadding']=function(){const _0x495e42=_0x193f56;if(this[_0x495e42(0x3a4)]===undefined)this[_0x495e42(0x466)]();if(this['_CoreEngineSettings'][_0x495e42(0x587)]===undefined)this[_0x495e42(0x466)]();return this['_CoreEngineSettings'][_0x495e42(0x587)];},Game_System['prototype'][_0x193f56(0x5e8)]=function(_0x596ec3){const _0x26792c=_0x193f56;if(this['_CoreEngineSettings']===undefined)this[_0x26792c(0x466)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x26792c(0x587)]=_0x596ec3;},VisuMZ[_0x193f56(0x818)]['Game_Screen_initialize']=Game_Screen[_0x193f56(0x415)][_0x193f56(0x7c5)],Game_Screen[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(){const _0x1d901d=_0x193f56;VisuMZ[_0x1d901d(0x818)][_0x1d901d(0x59a)]['call'](this),this[_0x1d901d(0x20b)]();},Game_Screen[_0x193f56(0x415)][_0x193f56(0x20b)]=function(){const _0x5dc7d8=_0x193f56,_0x5db5c5=VisuMZ[_0x5dc7d8(0x818)][_0x5dc7d8(0x7fe)][_0x5dc7d8(0x855)];this['_coreEngineShakeStyle']=_0x5db5c5?.[_0x5dc7d8(0x8c1)]||'random';},Game_Screen[_0x193f56(0x415)][_0x193f56(0x2c2)]=function(){const _0x260606=_0x193f56;if(this['_coreEngineShakeStyle']===undefined)this[_0x260606(0x20b)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x193f56(0x415)][_0x193f56(0x391)]=function(_0x124191){const _0x41b72a=_0x193f56;if(this[_0x41b72a(0x4a7)]===undefined)this[_0x41b72a(0x20b)]();this['_coreEngineShakeStyle']=_0x124191[_0x41b72a(0x881)]()[_0x41b72a(0x4f6)]();},Game_Picture[_0x193f56(0x415)][_0x193f56(0x612)]=function(){const _0x37d310=_0x193f56;if($gameParty[_0x37d310(0x6d7)]())return![];return this[_0x37d310(0x41f)]()&&this[_0x37d310(0x41f)]()[_0x37d310(0x37b)](0x0)==='!';},VisuMZ[_0x193f56(0x818)]['Game_Picture_x']=Game_Picture[_0x193f56(0x415)]['x'],Game_Picture[_0x193f56(0x415)]['x']=function(){const _0x49275c=_0x193f56;if(this[_0x49275c(0x612)]())return this[_0x49275c(0x8ae)]();else{if(_0x49275c(0x5b5)!=='HJdlZ')return VisuMZ[_0x49275c(0x818)][_0x49275c(0x412)][_0x49275c(0x865)](this);else _0x312135=_0x391f3b['boxHeight']-_0x104e8f;}},Game_Picture[_0x193f56(0x415)][_0x193f56(0x8ae)]=function(){const _0x40a874=_0x193f56,_0x29cb68=$gameMap[_0x40a874(0x5eb)]()*$gameMap[_0x40a874(0x4e8)]();return this['_x']-_0x29cb68;},VisuMZ[_0x193f56(0x818)]['Game_Picture_y']=Game_Picture[_0x193f56(0x415)]['y'],Game_Picture['prototype']['y']=function(){const _0x3cb157=_0x193f56;if(this[_0x3cb157(0x612)]())return this[_0x3cb157(0x61c)]();else{if('SjePj'!=='SjePj'){var _0x452d31=_0x3b6f88(_0x3cb157(0x190))[_0x3cb157(0x899)]['get']();_0x4c02bd[_0x3cb157(0x878)]();if(_0x1e2366)_0x1cd040(_0x452d31[_0x3cb157(0x2df)][_0x3cb157(0x65c)](_0x452d31),0x190);}else return VisuMZ[_0x3cb157(0x818)][_0x3cb157(0x1b9)][_0x3cb157(0x865)](this);}},Game_Picture[_0x193f56(0x415)][_0x193f56(0x61c)]=function(){const _0x11350d=_0x193f56,_0x106493=$gameMap[_0x11350d(0x500)]()*$gameMap['tileHeight']();return this['_y']-_0x106493;},Game_Picture[_0x193f56(0x415)][_0x193f56(0x868)]=function(_0x4fd748){this['_coreEasingType']=_0x4fd748;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x62b)]=Game_Picture[_0x193f56(0x415)][_0x193f56(0x3d2)],Game_Picture[_0x193f56(0x415)][_0x193f56(0x3d2)]=function(_0x2d00a6){const _0x101c82=_0x193f56;this[_0x101c82(0x3f2)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3][_0x101c82(0x267)](this[_0x101c82(0x3f2)])){if(_0x101c82(0x570)!==_0x101c82(0x188))return VisuMZ[_0x101c82(0x818)]['Game_Picture_calcEasing'][_0x101c82(0x865)](this,_0x2d00a6);else this[_0x101c82(0x62a)]&&this['_helpWindow'][_0x101c82(0x57a)](_0x1eedd8['layoutSettings'][_0x101c82(0x895)]),this[_0x101c82(0x5ee)]&&this[_0x101c82(0x5ee)][_0x101c82(0x57a)](_0x429cb9[_0x101c82(0x711)][_0x101c82(0x181)]);}else return VisuMZ[_0x101c82(0x737)](_0x2d00a6,this[_0x101c82(0x3f2)]);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x6fe)]=Game_Action['prototype'][_0x193f56(0x535)],Game_Action['prototype']['itemHit']=function(_0x65a168){const _0x19659a=_0x193f56;if(VisuMZ[_0x19659a(0x818)][_0x19659a(0x7fe)][_0x19659a(0x168)]['ImprovedAccuracySystem'])return this[_0x19659a(0x6b5)](_0x65a168);else{if(_0x19659a(0x4e9)===_0x19659a(0x429)){var _0x29c856=_0x31fcad(_0x6ca2b7['$1'])/0x64;_0x27d2f7*=_0x29c856;}else return VisuMZ[_0x19659a(0x818)]['Game_Action_itemHit'][_0x19659a(0x865)](this,_0x65a168);}},Game_Action['prototype'][_0x193f56(0x6b5)]=function(_0x275523){const _0x4bd6e9=_0x193f56,_0x17d6f0=this['itemSuccessRate'](_0x275523),_0x1508d5=this[_0x4bd6e9(0x384)](_0x275523),_0x511a94=this[_0x4bd6e9(0x74d)](_0x275523);return _0x17d6f0*(_0x1508d5-_0x511a94);},VisuMZ['CoreEngine'][_0x193f56(0x4bc)]=Game_Action['prototype'][_0x193f56(0x77d)],Game_Action['prototype'][_0x193f56(0x77d)]=function(_0x2ac180){const _0x2d9d90=_0x193f56;if(VisuMZ[_0x2d9d90(0x818)][_0x2d9d90(0x7fe)][_0x2d9d90(0x168)][_0x2d9d90(0x193)]){if('coohl'!==_0x2d9d90(0x340))return 0x0;else _0x1bf89c[_0x2d9d90(0x415)][_0x2d9d90(0x366)][_0x2d9d90(0x865)](this),!_0x3c57d0[_0x2d9d90(0x50c)](_0x2079f1)&&(this[_0x2d9d90(0x3f1)][_0x2d9d90(0x4f0)](),this['_mapNameWindow'][_0x2d9d90(0x4de)](),this['_windowLayer'][_0x2d9d90(0x66c)]=![],_0x49eb2e[_0x2d9d90(0x2fd)]()),_0xb7fc5a['clearZoom'](),this[_0x2d9d90(0x5ef)]();}else return VisuMZ[_0x2d9d90(0x818)][_0x2d9d90(0x4bc)][_0x2d9d90(0x865)](this,_0x2ac180);},Game_Action[_0x193f56(0x415)][_0x193f56(0x8ba)]=function(_0x3c0b9f){const _0x3911b2=_0x193f56;return this[_0x3911b2(0x7e1)]()[_0x3911b2(0x473)]*0.01;},Game_Action[_0x193f56(0x415)][_0x193f56(0x384)]=function(_0x6cbb7f){const _0x4db246=_0x193f56;if(VisuMZ[_0x4db246(0x818)][_0x4db246(0x7fe)][_0x4db246(0x168)][_0x4db246(0x848)]&&this[_0x4db246(0x284)]())return 0x1;if(this[_0x4db246(0x3ff)]()){if(VisuMZ[_0x4db246(0x818)][_0x4db246(0x7fe)][_0x4db246(0x168)][_0x4db246(0x848)]&&this[_0x4db246(0x4ec)]()[_0x4db246(0x17f)]())return this[_0x4db246(0x4ec)]()[_0x4db246(0x16e)]+0.05;else{if('lGlyv'===_0x4db246(0x534))_0x32a7e5[_0x4db246(0x224)](!_0x2587ad[_0x4db246(0x88b)]());else return this[_0x4db246(0x4ec)]()[_0x4db246(0x16e)];}}else{if('GZmrZ'!==_0x4db246(0x343)){_0x1703d1[_0x4db246(0x818)][_0x4db246(0x7fe)][_0x4db246(0x210)][_0x4db246(0x6f1)][_0x4db246(0x1ea)][_0x4db246(0x865)](this);if(_0x22ebaf[_0x4db246(0x35b)]!==''&&_0x762c6e[_0x4db246(0x35b)]!==_0x4db246(0x42f))this[_0x4db246(0x856)]();if(_0x2e93db[_0x4db246(0x580)]!==''&&_0xafd11f['version']!==_0x4db246(0x8c7))this[_0x4db246(0x40a)]();}else return 0x1;}},Game_Action[_0x193f56(0x415)]['targetEvaRate']=function(_0x5d1ec5){const _0x586bb8=_0x193f56;if(this['subject']()[_0x586bb8(0x17f)]()===_0x5d1ec5['isActor']())return 0x0;if(this[_0x586bb8(0x3ff)]()){if(_0x586bb8(0x41a)==='cJdiq')return _0xb994c5[_0x586bb8(0x818)][_0x586bb8(0x7fe)][_0x586bb8(0x702)][_0x586bb8(0x780)];else{if(VisuMZ[_0x586bb8(0x818)]['Settings'][_0x586bb8(0x168)][_0x586bb8(0x848)]&&_0x5d1ec5[_0x586bb8(0x505)]())return _0x5d1ec5[_0x586bb8(0x60f)]-0.05;else{if(_0x586bb8(0x2e9)===_0x586bb8(0x2e9))return _0x5d1ec5['eva'];else{if(_0x1c469d)_0x40f2b5[_0x586bb8(0x258)](_0xd54396);}}}}else{if(this[_0x586bb8(0x7c6)]()){if(_0x586bb8(0x4fa)!==_0x586bb8(0x4e3))return _0x5d1ec5[_0x586bb8(0x456)];else{const _0x3e6d62=0x90,_0x1e498f=0x60,_0x1e2212=0x18;this[_0x586bb8(0x34f)]['bitmap']=this[_0x586bb8(0x2cf)],this[_0x586bb8(0x34f)][_0x586bb8(0x6c7)]['x']=0.5,this[_0x586bb8(0x34f)][_0x586bb8(0x6c7)]['y']=0x1,this[_0x586bb8(0x34f)][_0x586bb8(0x33b)](_0x4f4171[_0x586bb8(0x44b)](this[_0x586bb8(0x2c5)]/0x2),this['_height']),this[_0x586bb8(0x34f)][_0x586bb8(0x581)](_0x3e6d62,_0x1e498f,_0x1e2212,_0x1e2212),this[_0x586bb8(0x34f)][_0x586bb8(0x39f)]=0xff;}}else return 0x0;}},VisuMZ['CoreEngine'][_0x193f56(0x41c)]=Game_Action['prototype']['updateLastTarget'],Game_Action['prototype'][_0x193f56(0x38d)]=function(_0x3e5ef1){const _0xe71bd5=_0x193f56;VisuMZ[_0xe71bd5(0x818)][_0xe71bd5(0x41c)][_0xe71bd5(0x865)](this,_0x3e5ef1);if(VisuMZ[_0xe71bd5(0x818)][_0xe71bd5(0x7fe)][_0xe71bd5(0x168)][_0xe71bd5(0x193)])return;const _0x9ec006=_0x3e5ef1[_0xe71bd5(0x89e)]();_0x9ec006[_0xe71bd5(0x1ef)]&&(0x1-this[_0xe71bd5(0x77d)](_0x3e5ef1)>this[_0xe71bd5(0x535)](_0x3e5ef1)&&(_0x9ec006[_0xe71bd5(0x1ef)]=![],_0x9ec006[_0xe71bd5(0x5e1)]=!![]));},VisuMZ['CoreEngine'][_0x193f56(0x871)]=Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x131)],Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x131)]=function(){const _0x44e524=_0x193f56;this[_0x44e524(0x6fc)]={},VisuMZ['CoreEngine'][_0x44e524(0x871)][_0x44e524(0x865)](this);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x460)]=Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x197)],Game_BattlerBase[_0x193f56(0x415)]['refresh']=function(){const _0x376425=_0x193f56;this[_0x376425(0x6fc)]={},VisuMZ[_0x376425(0x818)]['Game_BattlerBase_refresh'][_0x376425(0x865)](this);},Game_BattlerBase[_0x193f56(0x415)]['checkCacheKey']=function(_0x3c083b){const _0x9364c0=_0x193f56;return this[_0x9364c0(0x6fc)]=this[_0x9364c0(0x6fc)]||{},this[_0x9364c0(0x6fc)][_0x3c083b]!==undefined;},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x740)]=function(_0x6844fe){const _0x3d812a=_0x193f56,_0x51e163=(_0x318bbe,_0x45b65b)=>{const _0x5717dc=_0x3273;if(!_0x45b65b)return _0x318bbe;if(_0x45b65b[_0x5717dc(0x365)]['match'](VisuMZ[_0x5717dc(0x818)][_0x5717dc(0x4b7)][_0x5717dc(0x740)][_0x6844fe])){if(_0x5717dc(0x494)===_0x5717dc(0x1ee)){const _0x7a39d1=_0xcfc6e8('fs');let _0x1e2d04=_0x5717dc(0x2bc)[_0x5717dc(0x627)](_0x420fd3||'0');_0x7a39d1['writeFile'](_0x1e2d04,_0x17f366,_0x28fe22=>{const _0x2e9a8e=_0x5717dc;if(_0x28fe22)throw _0x187a3b;else _0x453173&&_0x2a038e(_0x2e9a8e(0x433)[_0x2e9a8e(0x627)](_0x1e2d04));});}else{var _0x18c505=Number(RegExp['$1']);_0x318bbe+=_0x18c505;}}if(_0x45b65b[_0x5717dc(0x365)][_0x5717dc(0x3d7)](VisuMZ[_0x5717dc(0x818)][_0x5717dc(0x4b7)]['paramPlusJS'][_0x6844fe])){if(_0x5717dc(0x6af)===_0x5717dc(0x1e6)){const _0x2d5740=this['createChildSprite'](_0x4edb89,_0x1aba5f);_0x2d5740[_0x5717dc(0x481)][_0x5717dc(0x84f)](_0x1d8792[_0x259d09],0x0,0x0,_0x291792,_0x3d6c8c,_0x5717dc(0x6aa)),_0x2d5740['x']=(_0x2d14ff-(_0x1c2d9c[_0x5717dc(0x8f1)]-0x1)/0x2)*_0x145d65,_0x2d5740['dy']=-_0x1458df;}else{var _0x31f988=String(RegExp['$1']);try{_0x318bbe+=eval(_0x31f988);}catch(_0x37d9a6){if($gameTemp['isPlaytest']())console[_0x5717dc(0x8d9)](_0x37d9a6);}}}return _0x318bbe;};return this['traitObjects']()[_0x3d812a(0x4f2)](_0x51e163,this[_0x3d812a(0x759)][_0x6844fe]);},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x8a4)]=function(_0x4a7d57){const _0x244929=_0x193f56;var _0x4dc9aa=_0x244929(0x157)+(this[_0x244929(0x17f)]()?_0x244929(0x89c):'Enemy')+_0x244929(0x358)+_0x4a7d57;if(this[_0x244929(0x20d)](_0x4dc9aa))return this['_cache'][_0x4dc9aa];this[_0x244929(0x6fc)][_0x4dc9aa]=eval(VisuMZ['CoreEngine']['Settings']['Param'][_0x4dc9aa]);const _0x552022=(_0x35e810,_0x29163b)=>{const _0x213bdd=_0x244929;if(_0x213bdd(0x13f)!==_0x213bdd(0x13f))return _0x48fd21[_0x213bdd(0x711)][_0x213bdd(0x8d8)][_0x213bdd(0x865)](this);else{if(!_0x29163b)return _0x35e810;if(_0x29163b[_0x213bdd(0x365)]['match'](VisuMZ['CoreEngine'][_0x213bdd(0x4b7)][_0x213bdd(0x8a4)][_0x4a7d57])){if(_0x213bdd(0x189)===_0x213bdd(0x3e6))return _0x5e46bf[_0x213bdd(0x4ce)]()[_0x213bdd(0x198)](_0x5a423c);else{var _0x33ab92=Number(RegExp['$1']);if(_0x33ab92===0x0)_0x33ab92=Number[_0x213bdd(0x4c6)];_0x35e810=Math[_0x213bdd(0x347)](_0x35e810,_0x33ab92);}}if(_0x29163b[_0x213bdd(0x365)]['match'](VisuMZ['CoreEngine'][_0x213bdd(0x4b7)]['paramMaxJS'][_0x4a7d57])){if(_0x213bdd(0x84e)===_0x213bdd(0x7b5))return _0x19a90c[_0x213bdd(0x818)][_0x213bdd(0x7fe)]['TitleCommandList']['length'];else{var _0x5635c7=String(RegExp['$1']);try{_0x35e810=Math[_0x213bdd(0x347)](_0x35e810,Number(eval(_0x5635c7)));}catch(_0x999617){if('vfqoU'!=='vfqoU')_0x3145b7[_0x213bdd(0x818)]['Bitmap_strokeRect']['call'](this,_0xad73a6,_0xd26545,_0x2e701b,_0x4db85c,_0x308a0e),this[_0x213bdd(0x1f8)]();else{if($gameTemp[_0x213bdd(0x450)]())console[_0x213bdd(0x8d9)](_0x999617);}}}}return _0x35e810;}};if(this[_0x244929(0x6fc)][_0x4dc9aa]===0x0)this[_0x244929(0x6fc)][_0x4dc9aa]=Number[_0x244929(0x4c6)];return this[_0x244929(0x6fc)][_0x4dc9aa]=this[_0x244929(0x5a5)]()['reduce'](_0x552022,this[_0x244929(0x6fc)][_0x4dc9aa]),this[_0x244929(0x6fc)][_0x4dc9aa];},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x66b)]=function(_0x4e561c){const _0x404475=_0x193f56,_0x14d4a4=this['traitsPi'](Game_BattlerBase['TRAIT_PARAM'],_0x4e561c),_0x57e220=(_0x168127,_0x26dd62)=>{const _0x13c5cc=_0x3273;if(!_0x26dd62)return _0x168127;if(_0x26dd62[_0x13c5cc(0x365)][_0x13c5cc(0x3d7)](VisuMZ[_0x13c5cc(0x818)][_0x13c5cc(0x4b7)][_0x13c5cc(0x710)][_0x4e561c])){var _0x565c01=Number(RegExp['$1'])/0x64;_0x168127*=_0x565c01;}if(_0x26dd62['note'][_0x13c5cc(0x3d7)](VisuMZ['CoreEngine']['RegExp'][_0x13c5cc(0x658)][_0x4e561c])){if(_0x13c5cc(0x799)!==_0x13c5cc(0x799)){_0x4b05f4[_0x13c5cc(0x199)]();if(!_0x468b13[_0x13c5cc(0x615)]()){const _0xc7522d=_0x3df9bc['open'](_0x4ac329,'_blank');}else{const _0x207dfb=_0x1cb684[_0x13c5cc(0x8af)]==_0x13c5cc(0x6d1)?_0x13c5cc(0x561):_0x49e13f[_0x13c5cc(0x8af)]==_0x13c5cc(0x24b)?_0x13c5cc(0x372):_0x13c5cc(0x554);_0x4cdedb('child_process')[_0x13c5cc(0x52e)](_0x207dfb+'\x20'+_0xf7dccf);}}else{var _0x565c01=Number(RegExp['$1']);_0x168127*=_0x565c01;}}if(_0x26dd62[_0x13c5cc(0x365)][_0x13c5cc(0x3d7)](VisuMZ['CoreEngine'][_0x13c5cc(0x4b7)][_0x13c5cc(0x8d0)][_0x4e561c])){var _0x520e1e=String(RegExp['$1']);try{_0x168127*=eval(_0x520e1e);}catch(_0x451a1e){if($gameTemp['isPlaytest']())console['log'](_0x451a1e);}}return _0x168127;};return this[_0x404475(0x5a5)]()['reduce'](_0x57e220,_0x14d4a4);},Game_BattlerBase['prototype'][_0x193f56(0x348)]=function(_0x1bc015){const _0xf2d142=_0x193f56,_0x249066=(_0xce3774,_0x120527)=>{const _0x1ee8b6=_0x3273;if(!_0x120527)return _0xce3774;if(_0x120527[_0x1ee8b6(0x365)]['match'](VisuMZ[_0x1ee8b6(0x818)][_0x1ee8b6(0x4b7)][_0x1ee8b6(0x897)][_0x1bc015])){var _0xae9fd9=Number(RegExp['$1']);_0xce3774+=_0xae9fd9;}if(_0x120527[_0x1ee8b6(0x365)][_0x1ee8b6(0x3d7)](VisuMZ[_0x1ee8b6(0x818)][_0x1ee8b6(0x4b7)]['paramFlatJS'][_0x1bc015])){if(_0x1ee8b6(0x19a)==='rDFmU'){var _0x412ff3=String(RegExp['$1']);try{_0xce3774+=eval(_0x412ff3);}catch(_0x1d90e0){if(_0x1ee8b6(0x48a)===_0x1ee8b6(0x48a)){if($gameTemp[_0x1ee8b6(0x450)]())console['log'](_0x1d90e0);}else return _0x5de3ba[_0x1ee8b6(0x818)][_0x1ee8b6(0x7fe)]['UI'][_0x1ee8b6(0x25a)];}}else _0x251418[_0x1ee8b6(0x645)](_0x1e7bd5);}return _0xce3774;};return this[_0xf2d142(0x5a5)]()[_0xf2d142(0x4f2)](_0x249066,0x0);},Game_BattlerBase['prototype'][_0x193f56(0x287)]=function(_0x227940){const _0x4844ff=_0x193f56;let _0x32cfd1=_0x4844ff(0x287)+_0x227940+_0x4844ff(0x25d);if(this['checkCacheKey'](_0x32cfd1))return this[_0x4844ff(0x6fc)][_0x32cfd1];return this['_cache'][_0x32cfd1]=Math[_0x4844ff(0x44b)](VisuMZ[_0x4844ff(0x818)][_0x4844ff(0x7fe)]['Param'][_0x4844ff(0x689)]['call'](this,_0x227940)),this[_0x4844ff(0x6fc)][_0x32cfd1];},Game_BattlerBase['prototype'][_0x193f56(0x674)]=function(_0xcfa27c){const _0x3b289c=_0x193f56,_0x121c89=(_0x5118ad,_0x52becf)=>{const _0xa3e78b=_0x3273;if(!_0x52becf)return _0x5118ad;if(_0x52becf['note']['match'](VisuMZ[_0xa3e78b(0x818)]['RegExp'][_0xa3e78b(0x45b)][_0xcfa27c])){if('BRcoj'===_0xa3e78b(0x6b9)){const _0x2dd9f2=_0x496fba['skillId'];if(_0x2dd9f2===0x1&&this[_0xa3e78b(0x4ec)]()[_0xa3e78b(0x8cb)]()!==0x1)this['setAttack']();else _0x2dd9f2===0x2&&this[_0xa3e78b(0x4ec)]()['guardSkillId']()!==0x2?this['setGuard']():this['setSkill'](_0x2dd9f2);}else{var _0x3d198c=Number(RegExp['$1'])/0x64;_0x5118ad+=_0x3d198c;}}if(_0x52becf[_0xa3e78b(0x365)][_0xa3e78b(0x3d7)](VisuMZ[_0xa3e78b(0x818)][_0xa3e78b(0x4b7)][_0xa3e78b(0x5f1)][_0xcfa27c])){var _0x3d198c=Number(RegExp['$1']);_0x5118ad+=_0x3d198c;}if(_0x52becf['note'][_0xa3e78b(0x3d7)](VisuMZ['CoreEngine'][_0xa3e78b(0x4b7)][_0xa3e78b(0x820)][_0xcfa27c])){var _0x5d656b=String(RegExp['$1']);try{_0x5118ad+=eval(_0x5d656b);}catch(_0x484820){if($gameTemp[_0xa3e78b(0x450)]())console[_0xa3e78b(0x8d9)](_0x484820);}}return _0x5118ad;};return this[_0x3b289c(0x5a5)]()[_0x3b289c(0x4f2)](_0x121c89,0x0);},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x373)]=function(_0x44a255){const _0x22c9fb=_0x193f56,_0x499c7a=(_0xff43f3,_0x242c86)=>{const _0x454fdf=_0x3273;if(_0x454fdf(0x6f6)===_0x454fdf(0x2be))this[_0x454fdf(0x7b0)][_0x454fdf(0x57a)](_0x3970e9[_0x454fdf(0x711)]['DummyBgType']);else{if(!_0x242c86)return _0xff43f3;if(_0x242c86[_0x454fdf(0x365)][_0x454fdf(0x3d7)](VisuMZ[_0x454fdf(0x818)][_0x454fdf(0x4b7)][_0x454fdf(0x192)][_0x44a255])){if(_0x454fdf(0x7d6)==='uMVDF'){var _0x484ccc=Number(RegExp['$1'])/0x64;_0xff43f3*=_0x484ccc;}else return _0x51082b[_0x454fdf(0x711)][_0x454fdf(0x13a)]['call'](this);}if(_0x242c86[_0x454fdf(0x365)][_0x454fdf(0x3d7)](VisuMZ[_0x454fdf(0x818)][_0x454fdf(0x4b7)][_0x454fdf(0x657)][_0x44a255])){var _0x484ccc=Number(RegExp['$1']);_0xff43f3*=_0x484ccc;}if(_0x242c86['note'][_0x454fdf(0x3d7)](VisuMZ[_0x454fdf(0x818)][_0x454fdf(0x4b7)]['xparamRateJS'][_0x44a255])){if(_0x454fdf(0x31b)!==_0x454fdf(0x31b))this[_0x454fdf(0x77e)]+=this[_0x454fdf(0x66c)]?this[_0x454fdf(0x2ae)]():-0x1*this[_0x454fdf(0x2ae)](),this[_0x454fdf(0x77e)]=_0xafad2[_0x454fdf(0x222)](0xc0,this[_0x454fdf(0x77e)]);else{var _0x171c2d=String(RegExp['$1']);try{_0x454fdf(0x312)===_0x454fdf(0x312)?_0xff43f3*=eval(_0x171c2d):_0x15d1fd[_0x454fdf(0x450)]()&&(_0x33b1b9[_0x454fdf(0x8d9)](_0x454fdf(0x75f)),_0x1d97d3[_0x454fdf(0x8d9)](_0x816e73));}catch(_0x2c732f){if($gameTemp[_0x454fdf(0x450)]())console[_0x454fdf(0x8d9)](_0x2c732f);}}}return _0xff43f3;}};return this[_0x22c9fb(0x5a5)]()['reduce'](_0x499c7a,0x1);},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x87d)]=function(_0x2e9dc0){const _0x1c497b=_0x193f56,_0x41617b=(_0xb29d10,_0x44bde5)=>{const _0xae339c=_0x3273;if(!_0x44bde5)return _0xb29d10;if(_0x44bde5[_0xae339c(0x365)]['match'](VisuMZ[_0xae339c(0x818)]['RegExp'][_0xae339c(0x7fd)][_0x2e9dc0])){var _0x12bd85=Number(RegExp['$1'])/0x64;_0xb29d10+=_0x12bd85;}if(_0x44bde5[_0xae339c(0x365)][_0xae339c(0x3d7)](VisuMZ[_0xae339c(0x818)]['RegExp'][_0xae339c(0x712)][_0x2e9dc0])){var _0x12bd85=Number(RegExp['$1']);_0xb29d10+=_0x12bd85;}if(_0x44bde5['note'][_0xae339c(0x3d7)](VisuMZ[_0xae339c(0x818)][_0xae339c(0x4b7)][_0xae339c(0x27f)][_0x2e9dc0])){var _0x205e0f=String(RegExp['$1']);try{_0xb29d10+=eval(_0x205e0f);}catch(_0xfbf3fc){if(_0xae339c(0x76c)!=='FNjuC'){if($gameTemp[_0xae339c(0x450)]())console['log'](_0xfbf3fc);}else _0x47ae6e[_0xae339c(0x418)](),this[_0xae339c(0x486)](_0xae339c(0x35e));}}return _0xb29d10;};return this['traitObjects']()[_0x1c497b(0x4f2)](_0x41617b,0x0);},Game_BattlerBase['prototype'][_0x193f56(0x15a)]=function(_0x248322){const _0x308cb7=_0x193f56;let _0x4e4b02=_0x308cb7(0x15a)+_0x248322+_0x308cb7(0x25d);if(this[_0x308cb7(0x20d)](_0x4e4b02))return this[_0x308cb7(0x6fc)][_0x4e4b02];return this[_0x308cb7(0x6fc)][_0x4e4b02]=VisuMZ[_0x308cb7(0x818)][_0x308cb7(0x7fe)][_0x308cb7(0x14d)][_0x308cb7(0x3ec)][_0x308cb7(0x865)](this,_0x248322),this[_0x308cb7(0x6fc)][_0x4e4b02];},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x537)]=function(_0x120ee0){const _0x4bbc77=_0x193f56,_0xfa312a=(_0x58887c,_0x332cfb)=>{const _0x2d439f=_0x3273;if(_0x2d439f(0x228)===_0x2d439f(0x228)){if(!_0x332cfb)return _0x58887c;if(_0x332cfb[_0x2d439f(0x365)][_0x2d439f(0x3d7)](VisuMZ[_0x2d439f(0x818)][_0x2d439f(0x4b7)][_0x2d439f(0x2a2)][_0x120ee0])){var _0x12010f=Number(RegExp['$1'])/0x64;_0x58887c+=_0x12010f;}if(_0x332cfb[_0x2d439f(0x365)][_0x2d439f(0x3d7)](VisuMZ[_0x2d439f(0x818)][_0x2d439f(0x4b7)][_0x2d439f(0x498)][_0x120ee0])){if('SmwGS'!=='obfzR'){var _0x12010f=Number(RegExp['$1']);_0x58887c+=_0x12010f;}else{const _0x24c2b0=this[_0x2d439f(0x4e5)](_0x5e9554),_0x4669d7=_0x2cb7b9[_0x2d439f(0x818)][_0x2d439f(0x7fe)][_0x2d439f(0x14d)][_0x2d439f(0x70a)][_0x58439a],_0x1ae3ad=_0x526aff['param'](_0x4669d7),_0xc3bfa5=this[_0x2d439f(0x80e)][_0x2d439f(0x5e2)](_0x4669d7,!![]);this[_0x2d439f(0x5ad)](_0x24c2b0['x'],_0x24c2b0['y'],0xa0,_0x4669d7,![]),this[_0x2d439f(0x33e)](),this[_0x2d439f(0x84f)](_0xc3bfa5,_0x24c2b0['x']+0xa0,_0x24c2b0['y'],0x3c,'right');}}if(_0x332cfb[_0x2d439f(0x365)][_0x2d439f(0x3d7)](VisuMZ[_0x2d439f(0x818)]['RegExp'][_0x2d439f(0x756)][_0x120ee0])){var _0xf90d00=String(RegExp['$1']);try{_0x58887c+=eval(_0xf90d00);}catch(_0x53462d){if($gameTemp['isPlaytest']())console[_0x2d439f(0x8d9)](_0x53462d);}}return _0x58887c;}else{if(_0x4e3c92)throw _0x2b5fd8;else _0x5f42e7&&_0x2ac8f6(_0x2d439f(0x433)[_0x2d439f(0x627)](_0x15ff1e));}};return this[_0x4bbc77(0x5a5)]()['reduce'](_0xfa312a,0x0);},Game_BattlerBase[_0x193f56(0x415)]['sparamRate']=function(_0x340b53){const _0x1dd554=(_0x4f6251,_0x254981)=>{const _0x47c269=_0x3273;if(_0x47c269(0x88d)===_0x47c269(0x126))_0x16eff9['CoreEngine'][_0x47c269(0x268)]['call'](this),this['setCoreEngineUpdateWindowBg']();else{if(!_0x254981)return _0x4f6251;if(_0x254981[_0x47c269(0x365)][_0x47c269(0x3d7)](VisuMZ[_0x47c269(0x818)][_0x47c269(0x4b7)][_0x47c269(0x155)][_0x340b53])){if(_0x47c269(0x732)==='LSKdf'){var _0x3eac2a=Number(RegExp['$1'])/0x64;_0x4f6251*=_0x3eac2a;}else this[_0x47c269(0x42c)]=this['_onceParallelInterpreters']||[],this[_0x47c269(0x42c)][_0x47c269(0x8a7)](_0x23cb85);}if(_0x254981[_0x47c269(0x365)][_0x47c269(0x3d7)](VisuMZ[_0x47c269(0x818)]['RegExp']['sparamRate2'][_0x340b53])){if(_0x47c269(0x1f9)===_0x47c269(0x18e))_0x5c708d=_0x3320f0[_0x47c269(0x44b)](_0x190913),_0x89dbe3=_0x2a57c3[_0x47c269(0x44b)](_0x505055),_0x59154d[_0x47c269(0x818)]['Window_Base_drawCharacter']['call'](this,_0x2a94b4,_0x5bc1a8,_0x3178ce,_0x43a0dc);else{var _0x3eac2a=Number(RegExp['$1']);_0x4f6251*=_0x3eac2a;}}if(_0x254981[_0x47c269(0x365)][_0x47c269(0x3d7)](VisuMZ[_0x47c269(0x818)][_0x47c269(0x4b7)]['sparamRateJS'][_0x340b53])){var _0xfbb85a=String(RegExp['$1']);try{_0x4f6251*=eval(_0xfbb85a);}catch(_0x3768e2){if(_0x47c269(0x2e6)===_0x47c269(0x1f6))return _0x3eac88[_0x47c269(0x2b6)](_0x47c269(0x73a));else{if($gameTemp[_0x47c269(0x450)]())console[_0x47c269(0x8d9)](_0x3768e2);}}}return _0x4f6251;}};return this['traitObjects']()['reduce'](_0x1dd554,0x1);},Game_BattlerBase[_0x193f56(0x415)]['sparamFlatBonus']=function(_0xe1abf){const _0x185a5f=_0x193f56,_0x284609=(_0x1daea2,_0x199a69)=>{const _0x4fa86a=_0x3273;if(!_0x199a69)return _0x1daea2;if(_0x199a69[_0x4fa86a(0x365)]['match'](VisuMZ[_0x4fa86a(0x818)]['RegExp'][_0x4fa86a(0x67c)][_0xe1abf])){if(_0x4fa86a(0x24d)===_0x4fa86a(0x24d)){var _0x386990=Number(RegExp['$1'])/0x64;_0x1daea2+=_0x386990;}else _0x15dc69[_0x4fa86a(0x818)]['ColorManager_loadWindowskin'][_0x4fa86a(0x865)](this),this[_0x4fa86a(0x406)]=this[_0x4fa86a(0x406)]||{};}if(_0x199a69['note'][_0x4fa86a(0x3d7)](VisuMZ[_0x4fa86a(0x818)]['RegExp'][_0x4fa86a(0x8b8)][_0xe1abf])){var _0x386990=Number(RegExp['$1']);_0x1daea2+=_0x386990;}if(_0x199a69['note'][_0x4fa86a(0x3d7)](VisuMZ[_0x4fa86a(0x818)][_0x4fa86a(0x4b7)][_0x4fa86a(0x31f)][_0xe1abf])){var _0x3cada0=String(RegExp['$1']);try{_0x1daea2+=eval(_0x3cada0);}catch(_0x12fe97){if($gameTemp['isPlaytest']())console[_0x4fa86a(0x8d9)](_0x12fe97);}}return _0x1daea2;};return this[_0x185a5f(0x5a5)]()[_0x185a5f(0x4f2)](_0x284609,0x0);},Game_BattlerBase['prototype'][_0x193f56(0x628)]=function(_0x563fe8){const _0x3302e0=_0x193f56;let _0x5cfbea='sparam'+_0x563fe8+_0x3302e0(0x25d);if(this[_0x3302e0(0x20d)](_0x5cfbea))return this[_0x3302e0(0x6fc)][_0x5cfbea];return this[_0x3302e0(0x6fc)][_0x5cfbea]=VisuMZ[_0x3302e0(0x818)][_0x3302e0(0x7fe)][_0x3302e0(0x14d)][_0x3302e0(0x8c0)][_0x3302e0(0x865)](this,_0x563fe8),this[_0x3302e0(0x6fc)][_0x5cfbea];},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x5e2)]=function(_0x42e390,_0x5de9a6){const _0xe7e5a6=_0x193f56;if(typeof paramId===_0xe7e5a6(0x69f))return this[_0xe7e5a6(0x287)](_0x42e390);_0x42e390=String(_0x42e390||'')['toUpperCase']();if(_0x42e390==='MAXHP')return this['param'](0x0);if(_0x42e390===_0xe7e5a6(0x4d5))return this[_0xe7e5a6(0x287)](0x1);if(_0x42e390===_0xe7e5a6(0x1f3))return this[_0xe7e5a6(0x287)](0x2);if(_0x42e390===_0xe7e5a6(0x100))return this[_0xe7e5a6(0x287)](0x3);if(_0x42e390==='MAT')return this[_0xe7e5a6(0x287)](0x4);if(_0x42e390===_0xe7e5a6(0x5fa))return this[_0xe7e5a6(0x287)](0x5);if(_0x42e390===_0xe7e5a6(0x43e))return this[_0xe7e5a6(0x287)](0x6);if(_0x42e390===_0xe7e5a6(0x7cd))return this[_0xe7e5a6(0x287)](0x7);if(_0x42e390==='HIT')return _0x5de9a6?String(Math['round'](this[_0xe7e5a6(0x15a)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x42e390==='EVA')return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x15a)](0x1)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x1);if(_0x42e390==='CRI')return _0x5de9a6?String(Math['round'](this[_0xe7e5a6(0x15a)](0x2)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x2);if(_0x42e390===_0xe7e5a6(0x356))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x15a)](0x3)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x3);if(_0x42e390===_0xe7e5a6(0x55e))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this['xparam'](0x4)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x4);if(_0x42e390===_0xe7e5a6(0x4b8))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x15a)](0x5)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x5);if(_0x42e390===_0xe7e5a6(0x2dd))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x15a)](0x6)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x6);if(_0x42e390===_0xe7e5a6(0x2ec))return _0x5de9a6?String(Math['round'](this[_0xe7e5a6(0x15a)](0x7)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x7);if(_0x42e390===_0xe7e5a6(0x17d))return _0x5de9a6?String(Math['round'](this[_0xe7e5a6(0x15a)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x42e390==='TRG')return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this['xparam'](0x9)*0x64))+'%':this[_0xe7e5a6(0x15a)](0x9);if(_0x42e390===_0xe7e5a6(0x4a4))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this['sparam'](0x0)*0x64))+'%':this[_0xe7e5a6(0x628)](0x0);if(_0x42e390===_0xe7e5a6(0x211))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x628)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x42e390===_0xe7e5a6(0x679))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this['sparam'](0x2)*0x64))+'%':this[_0xe7e5a6(0x628)](0x2);if(_0x42e390==='PHA')return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this['sparam'](0x3)*0x64))+'%':this[_0xe7e5a6(0x628)](0x3);if(_0x42e390===_0xe7e5a6(0x2b2))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x628)](0x4)*0x64))+'%':this[_0xe7e5a6(0x628)](0x4);if(_0x42e390===_0xe7e5a6(0x82b))return _0x5de9a6?String(Math['round'](this[_0xe7e5a6(0x628)](0x5)*0x64))+'%':this[_0xe7e5a6(0x628)](0x5);if(_0x42e390===_0xe7e5a6(0x6b1))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this['sparam'](0x6)*0x64))+'%':this[_0xe7e5a6(0x628)](0x6);if(_0x42e390===_0xe7e5a6(0x7d8))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x628)](0x7)*0x64))+'%':this[_0xe7e5a6(0x628)](0x7);if(_0x42e390===_0xe7e5a6(0x3de))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x628)](0x8)*0x64))+'%':this[_0xe7e5a6(0x628)](0x8);if(_0x42e390===_0xe7e5a6(0x7d2))return _0x5de9a6?String(Math[_0xe7e5a6(0x44b)](this[_0xe7e5a6(0x628)](0x9)*0x64))+'%':this[_0xe7e5a6(0x628)](0x9);if(VisuMZ['CoreEngine'][_0xe7e5a6(0x3e0)][_0x42e390]){if(_0xe7e5a6(0x370)!==_0xe7e5a6(0x483)){const _0x21f2be=VisuMZ['CoreEngine'][_0xe7e5a6(0x3e0)][_0x42e390],_0x4394fc=this[_0x21f2be];return VisuMZ[_0xe7e5a6(0x818)][_0xe7e5a6(0x5c6)][_0x42e390]===_0xe7e5a6(0x60d)?_0x4394fc:_0xe7e5a6(0x7ee)!=='HVUBW'?_0x4085ef[_0xe7e5a6(0x2b6)]('ok'):_0x5de9a6?String(Math[_0xe7e5a6(0x44b)](_0x4394fc*0x64))+'%':_0x4394fc;}else this[_0xe7e5a6(0x62a)][_0xe7e5a6(0x57a)](_0x55f870['layoutSettings'][_0xe7e5a6(0x895)]);}return'';},Game_BattlerBase[_0x193f56(0x415)][_0x193f56(0x859)]=function(){const _0x174a7f=_0x193f56;return this[_0x174a7f(0x7ff)]()&&this[_0x174a7f(0x313)]<this['mhp']*VisuMZ[_0x174a7f(0x818)][_0x174a7f(0x7fe)][_0x174a7f(0x14d)][_0x174a7f(0x673)];},Game_Battler['prototype'][_0x193f56(0x7f9)]=function(){const _0x2b56e7=_0x193f56;SoundManager[_0x2b56e7(0x72b)](),this['requestMotion'](_0x2b56e7(0x81d));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x119)]=Game_Actor[_0x193f56(0x415)][_0x193f56(0x363)],Game_Actor[_0x193f56(0x415)][_0x193f56(0x363)]=function(_0x2df204){const _0x46188f=_0x193f56;if(this['level']>0x63)return this[_0x46188f(0x806)](_0x2df204);return VisuMZ[_0x46188f(0x818)][_0x46188f(0x119)]['call'](this,_0x2df204);},Game_Actor[_0x193f56(0x415)][_0x193f56(0x806)]=function(_0x426cc3){const _0x2b3ba7=_0x193f56,_0x5b9b8e=this[_0x2b3ba7(0x3be)]()[_0x2b3ba7(0x531)][_0x426cc3][0x63],_0x2d5742=this[_0x2b3ba7(0x3be)]()[_0x2b3ba7(0x531)][_0x426cc3][0x62];return _0x5b9b8e+(_0x5b9b8e-_0x2d5742)*(this['level']-0x63);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x3ae)]=Game_Actor['prototype'][_0x193f56(0x567)],Game_Actor[_0x193f56(0x415)][_0x193f56(0x567)]=function(_0x214805,_0xf6a93e){const _0x231365=_0x193f56;$gameTemp['_changingClass']=!![],VisuMZ[_0x231365(0x818)][_0x231365(0x3ae)][_0x231365(0x865)](this,_0x214805,_0xf6a93e),$gameTemp[_0x231365(0x876)]=undefined;},VisuMZ['CoreEngine'][_0x193f56(0x289)]=Game_Actor['prototype'][_0x193f56(0x3c3)],Game_Actor['prototype'][_0x193f56(0x3c3)]=function(){const _0x43be66=_0x193f56;VisuMZ[_0x43be66(0x818)][_0x43be66(0x289)][_0x43be66(0x865)](this);if(!$gameTemp[_0x43be66(0x876)])this['levelUpRecovery']();},Game_Actor[_0x193f56(0x415)][_0x193f56(0x303)]=function(){const _0x150100=_0x193f56;this['_cache']={};if(VisuMZ['CoreEngine'][_0x150100(0x7fe)][_0x150100(0x168)][_0x150100(0x631)])this['_hp']=this[_0x150100(0x397)];if(VisuMZ[_0x150100(0x818)]['Settings'][_0x150100(0x168)]['LevelUpFullMp'])this[_0x150100(0x85a)]=this[_0x150100(0x35c)];},Game_Actor[_0x193f56(0x415)][_0x193f56(0x34a)]=function(){const _0x28d3e8=_0x193f56;if(this['isMaxLevel']())return 0x1;const _0x2f314e=this['nextLevelExp']()-this[_0x28d3e8(0x1fc)](),_0x586f48=this['currentExp']()-this[_0x28d3e8(0x1fc)]();return(_0x586f48/_0x2f314e)['clamp'](0x0,0x1);},Game_Actor[_0x193f56(0x415)][_0x193f56(0x5a5)]=function(){const _0x560a7d=_0x193f56,_0x2be34b=Game_Battler[_0x560a7d(0x415)][_0x560a7d(0x5a5)][_0x560a7d(0x865)](this);for(const _0x5e7cd7 of this[_0x560a7d(0x558)]()){_0x5e7cd7&&_0x2be34b[_0x560a7d(0x8a7)](_0x5e7cd7);}return _0x2be34b[_0x560a7d(0x8a7)](this[_0x560a7d(0x3be)](),this[_0x560a7d(0x4ce)]()),_0x2be34b;},Object[_0x193f56(0x590)](Game_Enemy[_0x193f56(0x415)],'level',{'get':function(){const _0x570729=_0x193f56;return this[_0x570729(0x5ec)]();},'configurable':!![]}),Game_Enemy[_0x193f56(0x415)][_0x193f56(0x5ec)]=function(){const _0x483c49=_0x193f56;return this[_0x483c49(0x430)]()[_0x483c49(0x3e5)];},Game_Enemy[_0x193f56(0x415)][_0x193f56(0x773)]=function(){const _0x265f7f=_0x193f56;if(!this['_repositioned']){this[_0x265f7f(0x65d)]+=Math['round']((Graphics[_0x265f7f(0x89f)]-0x270)/0x2),this[_0x265f7f(0x65d)]-=Math[_0x265f7f(0x66d)]((Graphics[_0x265f7f(0x89f)]-Graphics[_0x265f7f(0x485)])/0x2);if($gameSystem[_0x265f7f(0x88b)]())this['_screenX']-=Math[_0x265f7f(0x66d)]((Graphics[_0x265f7f(0x890)]-Graphics[_0x265f7f(0x474)])/0x2);else{if('rDwik'===_0x265f7f(0x5c2))return _0x5cfb76[_0x265f7f(0x711)][_0x265f7f(0x68e)][_0x265f7f(0x865)](this);else this[_0x265f7f(0x5ca)]+=Math['round']((Graphics['boxWidth']-0x330)/0x2);}}this[_0x265f7f(0x571)]=!![];},Game_Party[_0x193f56(0x415)][_0x193f56(0x12c)]=function(){const _0x1c3b8c=_0x193f56;return VisuMZ['CoreEngine'][_0x1c3b8c(0x7fe)][_0x1c3b8c(0x132)][_0x1c3b8c(0x42d)];},VisuMZ['CoreEngine']['Game_Party_consumeItem']=Game_Party[_0x193f56(0x415)]['consumeItem'],Game_Party[_0x193f56(0x415)][_0x193f56(0x355)]=function(_0x8d2d84){const _0x43adfb=_0x193f56;if(VisuMZ[_0x43adfb(0x818)][_0x43adfb(0x7fe)][_0x43adfb(0x168)][_0x43adfb(0x61e)]&&DataManager[_0x43adfb(0x36a)](_0x8d2d84))return;VisuMZ[_0x43adfb(0x818)][_0x43adfb(0x507)][_0x43adfb(0x865)](this,_0x8d2d84);},Game_Party['prototype'][_0x193f56(0x8a8)]=function(){const _0x3e2dad=_0x193f56,_0x3cc716=VisuMZ[_0x3e2dad(0x818)]['Settings'][_0x3e2dad(0x168)],_0x4ed10d=_0x3cc716[_0x3e2dad(0x656)]??0x63;let _0x3520c6=[];if(_0x3cc716[_0x3e2dad(0x3e3)]??!![]){if(_0x3e2dad(0x793)===_0x3e2dad(0x6ea))return this[_0x3e2dad(0x869)][_0x3e2dad(0x180)]();else _0x3520c6=_0x3520c6[_0x3e2dad(0x75c)]($dataItems);}(_0x3cc716[_0x3e2dad(0x143)]??!![])&&(_0x3520c6=_0x3520c6[_0x3e2dad(0x75c)]($dataWeapons));(_0x3cc716[_0x3e2dad(0x409)]??!![])&&('fyXKn'!=='fyXKn'?(this[_0x3e2dad(0x826)]+=this[_0x3e2dad(0x68d)](),this[_0x3e2dad(0x2c1)]()&&(this['_opening']=![])):_0x3520c6=_0x3520c6['concat']($dataArmors));for(const _0x8dfd6c of _0x3520c6){if(_0x3e2dad(0x838)===_0x3e2dad(0x3f3))this[_0x3e2dad(0x1e7)]='FV';else{if(!_0x8dfd6c)continue;if(_0x8dfd6c[_0x3e2dad(0x41f)]['trim']()<=0x0)continue;if(_0x8dfd6c[_0x3e2dad(0x41f)]['match'](/-----/i))continue;this['gainItem'](_0x8dfd6c,_0x4ed10d);}}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x5e4)]=Game_Troop[_0x193f56(0x415)][_0x193f56(0x8df)],Game_Troop['prototype']['setup']=function(_0x27384e){const _0x110cb1=_0x193f56;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x110cb1(0x59d)](_0x27384e),VisuMZ[_0x110cb1(0x818)]['Game_Troop_setup'][_0x110cb1(0x865)](this,_0x27384e);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x5bd)]=Game_Map['prototype']['setup'],Game_Map[_0x193f56(0x415)][_0x193f56(0x8df)]=function(_0x8bec44){const _0x4e5965=_0x193f56;VisuMZ[_0x4e5965(0x818)]['Game_Map_setup'][_0x4e5965(0x865)](this,_0x8bec44),this[_0x4e5965(0x42b)](_0x8bec44);},Game_Map['prototype'][_0x193f56(0x42b)]=function(){const _0x317f92=_0x193f56;this[_0x317f92(0x559)]=VisuMZ['CoreEngine'][_0x317f92(0x7fe)]['QoL'][_0x317f92(0x2d5)]||![];if($dataMap&&$dataMap[_0x317f92(0x365)]){if($dataMap[_0x317f92(0x365)][_0x317f92(0x3d7)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x317f92(0x365)]['match'](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map[_0x193f56(0x415)][_0x193f56(0x7f4)]=function(){const _0x57776b=_0x193f56;if(this[_0x57776b(0x559)]===undefined)this[_0x57776b(0x42b)]();return this[_0x57776b(0x559)];},VisuMZ[_0x193f56(0x818)]['Game_Character_processMoveCommand']=Game_Character['prototype'][_0x193f56(0x4ac)],Game_Character['prototype']['processMoveCommand']=function(_0x1b24bd){const _0x4aaed3=_0x193f56;try{if(_0x4aaed3(0x122)===_0x4aaed3(0x8da)){var _0xb97df8=_0x5d6b1a(_0x2c0ccd['$1']);try{_0x4f6311+=_0x4eab49(_0xb97df8);}catch(_0x4afd06){if(_0x47a59f[_0x4aaed3(0x450)]())_0x5087e6[_0x4aaed3(0x8d9)](_0x4afd06);}}else VisuMZ[_0x4aaed3(0x818)]['Game_Character_processMoveCommand']['call'](this,_0x1b24bd);}catch(_0x2b17a8){if('umrNL'!==_0x4aaed3(0x458)){if($gameTemp['isPlaytest']())console[_0x4aaed3(0x8d9)](_0x2b17a8);}else this[_0x4aaed3(0x394)]=(_0x5cdf64(_0x36cd14['$1'])||0x1)[_0x4aaed3(0x12f)](0x1,0xa);}},Game_Player[_0x193f56(0x415)][_0x193f56(0x564)]=function(){const _0x39b99c=_0x193f56,_0x94e0b6=$gameMap['encounterStep']();this['_encounterCount']=Math[_0x39b99c(0x528)](_0x94e0b6)+Math['randomInt'](_0x94e0b6)+this[_0x39b99c(0x8bd)]();},Game_Player[_0x193f56(0x415)][_0x193f56(0x8bd)]=function(){const _0x52d79c=_0x193f56;return $dataMap&&$dataMap['note']&&$dataMap[_0x52d79c(0x365)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x52d79c(0x818)][_0x52d79c(0x7fe)][_0x52d79c(0x168)][_0x52d79c(0x1a0)];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x6d0)]=Game_Event[_0x193f56(0x415)][_0x193f56(0x7ca)],Game_Event['prototype'][_0x193f56(0x7ca)]=function(_0x49d9f1,_0x12427c){const _0x337c24=_0x193f56;return this[_0x337c24(0x606)]()?_0x337c24(0x530)!==_0x337c24(0x14a)?this[_0x337c24(0x3ea)](_0x49d9f1,_0x12427c):_0x594fe9[_0x337c24(0x818)]['Settings'][_0x337c24(0x899)][_0x337c24(0x599)]:VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x337c24(0x865)](this,_0x49d9f1,_0x12427c);},Game_Event[_0x193f56(0x415)]['isSmartEventCollisionOn']=function(){const _0x414e9c=_0x193f56;return VisuMZ[_0x414e9c(0x818)][_0x414e9c(0x7fe)][_0x414e9c(0x168)][_0x414e9c(0x51c)];},Game_Event[_0x193f56(0x415)]['checkSmartEventCollision']=function(_0x308052,_0x19eb0a){const _0x3b26b1=_0x193f56;if(!this['isNormalPriority']())return![];else{if(_0x3b26b1(0x301)!==_0x3b26b1(0x7e7)){const _0x5716f1=$gameMap[_0x3b26b1(0x8bf)](_0x308052,_0x19eb0a)[_0x3b26b1(0x244)](_0x337f41=>_0x337f41[_0x3b26b1(0x660)]());return _0x5716f1[_0x3b26b1(0x8f1)]>0x0;}else _0x3cf7f4+=_0x470853/0x2;}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x345)]=Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x5c0)],Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x5c0)]=function(_0x484fb7){const _0x4e3f6a=_0x193f56,_0x953143=this[_0x4e3f6a(0x6fa)]();return _0x953143['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?_0x4e3f6a(0x68a)!=='BSCnS'?this[_0x4e3f6a(0x30a)](_0x953143):(_0x516133=_0x586250[_0x4e3f6a(0x552)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3409ab,_0x74be9e)=>_0x372be0(_0x31ddf0(_0x74be9e))),_0x4b97bb):VisuMZ['CoreEngine'][_0x4e3f6a(0x345)][_0x4e3f6a(0x865)](this,_0x484fb7);},Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x6fa)]=function(){const _0x1fa1ac=_0x193f56;let _0x249d2f='',_0x14bd13=this[_0x1fa1ac(0x73e)]+0x1;while(this[_0x1fa1ac(0x785)][_0x14bd13]&&this[_0x1fa1ac(0x785)][_0x14bd13][_0x1fa1ac(0x425)]===0x195){'PYXFO'!=='PYXFO'?this[_0x1fa1ac(0x78f)]():(_0x249d2f+=this['_list'][_0x14bd13][_0x1fa1ac(0x65a)][0x0]+'\x0a',_0x14bd13++);}return _0x249d2f;},Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x30a)]=function(_0x1bca10){const _0x3ed58d=_0x193f56;try{eval(_0x1bca10);}catch(_0x33fd2b){$gameTemp[_0x3ed58d(0x450)]()&&(_0x3ed58d(0x7e5)!==_0x3ed58d(0x7e5)?this['_slotWindow'][_0x3ed58d(0x57a)](_0x5315c6[_0x3ed58d(0x711)]['SlotBgType']):(console[_0x3ed58d(0x8d9)](_0x3ed58d(0x850)),console['log'](_0x33fd2b)));}return!![];},VisuMZ[_0x193f56(0x818)]['Game_Interpreter_command111']=Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x1dc)],Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x1dc)]=function(_0x2b08c6){const _0xf33456=_0x193f56;try{VisuMZ['CoreEngine'][_0xf33456(0x364)]['call'](this,_0x2b08c6);}catch(_0xb4177e){$gameTemp[_0xf33456(0x450)]()&&(console[_0xf33456(0x8d9)](_0xf33456(0x7aa)),console[_0xf33456(0x8d9)](_0xb4177e)),this['skipBranch']();}return!![];},VisuMZ['CoreEngine'][_0x193f56(0x8b6)]=Game_Interpreter['prototype'][_0x193f56(0x607)],Game_Interpreter[_0x193f56(0x415)]['command122']=function(_0x54c7eb){const _0x19596f=_0x193f56;try{VisuMZ[_0x19596f(0x818)][_0x19596f(0x8b6)]['call'](this,_0x54c7eb);}catch(_0x17cabe){_0x19596f(0x2ca)===_0x19596f(0x765)?this[_0x19596f(0x3f5)]||this[_0x19596f(0x4a0)]?this[_0x19596f(0x77e)]=0xff:(this['opacity']+=this[_0x19596f(0x66c)]?this[_0x19596f(0x2ae)]():-0x1*this[_0x19596f(0x2ae)](),this['opacity']=_0x44bb36[_0x19596f(0x222)](0xc0,this[_0x19596f(0x77e)])):$gameTemp[_0x19596f(0x450)]()&&(console[_0x19596f(0x8d9)]('Control\x20Variables\x20Script\x20Error'),console[_0x19596f(0x8d9)](_0x17cabe));}return!![];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x308)]=Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x78a)],Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x78a)]=function(){const _0x54deee=_0x193f56;try{VisuMZ[_0x54deee(0x818)][_0x54deee(0x308)][_0x54deee(0x865)](this);}catch(_0x493394){'DwyzR'==='RVIqe'?this[_0x54deee(0x746)]():$gameTemp[_0x54deee(0x450)]()&&(console['log']('Script\x20Call\x20Error'),console[_0x54deee(0x8d9)](_0x493394));}return!![];},VisuMZ[_0x193f56(0x818)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x369)],Game_Interpreter['prototype'][_0x193f56(0x369)]=function(_0x38f9ad){const _0x3ad2d8=_0x193f56;return $gameTemp[_0x3ad2d8(0x798)](this),VisuMZ[_0x3ad2d8(0x818)][_0x3ad2d8(0x745)]['call'](this,_0x38f9ad);},Scene_Base[_0x193f56(0x415)][_0x193f56(0x2ae)]=function(){const _0x18dd0c=_0x193f56;return VisuMZ['CoreEngine'][_0x18dd0c(0x7fe)]['UI'][_0x18dd0c(0x5f6)];},Scene_Base['prototype'][_0x193f56(0x504)]=function(){const _0x25c6c0=_0x193f56;return VisuMZ[_0x25c6c0(0x818)][_0x25c6c0(0x7fe)]['UI'][_0x25c6c0(0x7e8)];},Scene_Base['prototype'][_0x193f56(0x2b1)]=function(){const _0x2c987c=_0x193f56;return VisuMZ[_0x2c987c(0x818)][_0x2c987c(0x7fe)]['UI'][_0x2c987c(0x216)];},Scene_Base[_0x193f56(0x415)]['isRightInputMode']=function(){return VisuMZ['CoreEngine']['Settings']['UI']['RightMenus'];},Scene_Base[_0x193f56(0x415)][_0x193f56(0x1c6)]=function(){const _0x387a81=_0x193f56;return VisuMZ[_0x387a81(0x818)][_0x387a81(0x7fe)]['UI'][_0x387a81(0x436)];},Scene_Base[_0x193f56(0x415)][_0x193f56(0x69d)]=function(){const _0x4fdaa5=_0x193f56;return VisuMZ['CoreEngine'][_0x4fdaa5(0x7fe)]['UI'][_0x4fdaa5(0x519)];},Scene_Base[_0x193f56(0x415)][_0x193f56(0x40d)]=function(){const _0xee16da=_0x193f56;return VisuMZ[_0xee16da(0x818)][_0xee16da(0x7fe)][_0xee16da(0x899)]['EnableMasking'];},VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']=Scene_Base['prototype']['createWindowLayer'],Scene_Base['prototype'][_0x193f56(0x4ae)]=function(){const _0x29fc17=_0x193f56;VisuMZ['CoreEngine'][_0x29fc17(0x49f)][_0x29fc17(0x865)](this),this[_0x29fc17(0x511)](),this['_windowLayer']['x']=Math[_0x29fc17(0x44b)](this[_0x29fc17(0x854)]['x']),this[_0x29fc17(0x854)]['y']=Math[_0x29fc17(0x44b)](this[_0x29fc17(0x854)]['y']);},Scene_Base['prototype'][_0x193f56(0x511)]=function(){},Scene_Base[_0x193f56(0x415)][_0x193f56(0x20e)]=function(){const _0x3a45cb=_0x193f56;return TextManager[_0x3a45cb(0x25e)]('pageup',_0x3a45cb(0x62d));},Scene_Base[_0x193f56(0x415)][_0x193f56(0x613)]=function(){const _0x29d83a=_0x193f56;return TextManager[_0x29d83a(0x2b6)](_0x29d83a(0x141));},Scene_Base[_0x193f56(0x415)][_0x193f56(0x5bb)]=function(){const _0x72d34=_0x193f56;return TextManager[_0x72d34(0x2b6)](_0x72d34(0x73a));},Scene_Base['prototype'][_0x193f56(0x2cc)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base['prototype'][_0x193f56(0x8f9)]=function(){const _0x2b0e92=_0x193f56;return TextManager[_0x2b0e92(0x2b6)](_0x2b0e92(0x617));},Scene_Base['prototype'][_0x193f56(0x4a6)]=function(){const _0x33d51d=_0x193f56;if(this[_0x33d51d(0x872)]&&this['_pageupButton']['visible']){if(_0x33d51d(0x173)!==_0x33d51d(0x173))_0x44a195[_0x33d51d(0x818)][_0x33d51d(0x53c)][_0x33d51d(0x865)](this,_0x50a8fe,_0x3263c4,_0x2d07bc,_0x581149);else return TextManager[_0x33d51d(0x5b4)];}else{if(_0x33d51d(0x875)!=='rXAoM')return'';else this['_inputWindow'][_0x33d51d(0x57a)](_0x230870['layoutSettings'][_0x33d51d(0x4f3)]);}},Scene_Base['prototype'][_0x193f56(0x28d)]=function(){return'';},Scene_Base[_0x193f56(0x415)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x193f56(0x415)][_0x193f56(0x4a3)]=function(){const _0x19a82c=_0x193f56;return TextManager[_0x19a82c(0x26d)];},Scene_Base[_0x193f56(0x415)]['buttonAssistText5']=function(){const _0x3ff0c0=_0x193f56;return TextManager[_0x3ff0c0(0x40e)];},Scene_Base[_0x193f56(0x415)]['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x193f56(0x415)][_0x193f56(0x5a7)]=function(){return 0x0;},Scene_Base[_0x193f56(0x415)][_0x193f56(0x1e9)]=function(){return 0x0;},Scene_Base[_0x193f56(0x415)][_0x193f56(0x319)]=function(){return 0x0;},Scene_Base['prototype'][_0x193f56(0x2d8)]=function(){return 0x0;},VisuMZ[_0x193f56(0x818)]['Scene_Boot_loadSystemImages']=Scene_Boot['prototype']['loadSystemImages'],Scene_Boot[_0x193f56(0x415)][_0x193f56(0x4ea)]=function(){const _0x48559d=_0x193f56;VisuMZ[_0x48559d(0x818)][_0x48559d(0x31e)][_0x48559d(0x865)](this),this[_0x48559d(0x3d5)]();},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x3d5)]=function(){const _0x289921=_0x193f56,_0x2a220d=['animations','battlebacks1',_0x289921(0x16c),_0x289921(0x16f),'enemies',_0x289921(0x827),'parallaxes',_0x289921(0x139),_0x289921(0x33d),_0x289921(0x8b5),_0x289921(0x8bc),_0x289921(0x562),_0x289921(0x7e6),_0x289921(0x36f)];for(const _0x145dbf of _0x2a220d){if(_0x289921(0x233)!=='dvVng')this[_0x289921(0x837)]();else{const _0x44f241=VisuMZ['CoreEngine'][_0x289921(0x7fe)]['ImgLoad'][_0x145dbf],_0x38119a='img/%1/'[_0x289921(0x627)](_0x145dbf);for(const _0x23e8ad of _0x44f241){ImageManager[_0x289921(0x87b)](_0x38119a,_0x23e8ad);}}}},VisuMZ[_0x193f56(0x818)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x193f56(0x415)][_0x193f56(0x6c4)],Scene_Boot['prototype'][_0x193f56(0x6c4)]=function(){const _0x5113ac=_0x193f56;Utils[_0x5113ac(0x439)]('test')&&VisuMZ[_0x5113ac(0x818)][_0x5113ac(0x7fe)]['QoL'][_0x5113ac(0x4ed)]?this[_0x5113ac(0x853)]():VisuMZ['CoreEngine'][_0x5113ac(0x588)][_0x5113ac(0x865)](this);},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x853)]=function(){const _0x7236=_0x193f56;DataManager['setupNewGame'](),SceneManager[_0x7236(0x666)](Scene_Map);},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x230)]=function(){const _0x36f508=_0x193f56,_0x255e41=$dataSystem['advanced'][_0x36f508(0x7db)],_0x31711c=$dataSystem['advanced']['uiAreaHeight'],_0x4ff005=VisuMZ['CoreEngine'][_0x36f508(0x7fe)]['UI']['BoxMargin'];Graphics[_0x36f508(0x474)]=_0x255e41-_0x4ff005*0x2,Graphics[_0x36f508(0x485)]=_0x31711c-_0x4ff005*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x193f56(0x818)]['Scene_Boot_updateDocumentTitle']=Scene_Boot['prototype'][_0x193f56(0x306)],Scene_Boot[_0x193f56(0x415)][_0x193f56(0x306)]=function(){const _0x2586c2=_0x193f56;this['isFullDocumentTitle']()?this[_0x2586c2(0x746)]():_0x2586c2(0x57d)!=='DboiC'?this['_cancelButton']['y']=_0x52b857['boxHeight']-this[_0x2586c2(0x69d)]():VisuMZ[_0x2586c2(0x818)][_0x2586c2(0x582)][_0x2586c2(0x865)](this);},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x3b9)]=function(){const _0x3591da=_0x193f56;if(Scene_Title[_0x3591da(0x35b)]==='')return![];if(Scene_Title[_0x3591da(0x35b)]===_0x3591da(0x42f))return![];if(Scene_Title[_0x3591da(0x580)]==='')return![];if(Scene_Title['version']===_0x3591da(0x8c7))return![];return!![];},Scene_Boot[_0x193f56(0x415)][_0x193f56(0x746)]=function(){const _0x32e30e=_0x193f56,_0x867467=$dataSystem['gameTitle'],_0x4466fa=Scene_Title[_0x32e30e(0x35b)]||'',_0x57bfba=Scene_Title[_0x32e30e(0x580)]||'',_0x508ed3=VisuMZ['CoreEngine']['Settings'][_0x32e30e(0x210)]['Title'][_0x32e30e(0x2da)],_0x140250=_0x508ed3[_0x32e30e(0x627)](_0x867467,_0x4466fa,_0x57bfba);document[_0x32e30e(0x300)]=_0x140250;},Scene_Boot[_0x193f56(0x415)]['determineSideButtonLayoutValid']=function(){const _0x2aa8cf=_0x193f56;if(VisuMZ[_0x2aa8cf(0x818)][_0x2aa8cf(0x7fe)]['UI'][_0x2aa8cf(0x317)]){const _0x2a1e47=Graphics[_0x2aa8cf(0x890)]-Graphics[_0x2aa8cf(0x474)]-VisuMZ[_0x2aa8cf(0x818)][_0x2aa8cf(0x7fe)]['UI'][_0x2aa8cf(0x89b)]*0x2,_0x3fe333=Sprite_Button[_0x2aa8cf(0x415)][_0x2aa8cf(0x7e9)][_0x2aa8cf(0x865)](this)*0x4;if(_0x2a1e47>=_0x3fe333)SceneManager[_0x2aa8cf(0x30e)](!![]);}},Scene_Title[_0x193f56(0x35b)]=VisuMZ['CoreEngine'][_0x193f56(0x7fe)][_0x193f56(0x210)][_0x193f56(0x6f1)][_0x193f56(0x42f)],Scene_Title[_0x193f56(0x580)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x210)][_0x193f56(0x6f1)][_0x193f56(0x51f)],Scene_Title['pictureButtons']=VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x3e8)],VisuMZ['CoreEngine'][_0x193f56(0x5ac)]=Scene_Title[_0x193f56(0x415)][_0x193f56(0x1ea)],Scene_Title[_0x193f56(0x415)][_0x193f56(0x1ea)]=function(){const _0x48f0e6=_0x193f56;VisuMZ[_0x48f0e6(0x818)][_0x48f0e6(0x7fe)][_0x48f0e6(0x210)]['Title']['drawGameTitle'][_0x48f0e6(0x865)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x48f0e6(0x35b)]!==_0x48f0e6(0x42f))this[_0x48f0e6(0x856)]();if(Scene_Title['version']!==''&&Scene_Title['version']!==_0x48f0e6(0x8c7))this[_0x48f0e6(0x40a)]();},Scene_Title[_0x193f56(0x415)][_0x193f56(0x856)]=function(){const _0x37e025=_0x193f56;VisuMZ[_0x37e025(0x818)][_0x37e025(0x7fe)][_0x37e025(0x210)][_0x37e025(0x6f1)]['drawGameSubtitle'][_0x37e025(0x865)](this);},Scene_Title[_0x193f56(0x415)][_0x193f56(0x40a)]=function(){const _0x5dd4ae=_0x193f56;VisuMZ['CoreEngine'][_0x5dd4ae(0x7fe)][_0x5dd4ae(0x210)][_0x5dd4ae(0x6f1)][_0x5dd4ae(0x40a)]['call'](this);},Scene_Title[_0x193f56(0x415)][_0x193f56(0x217)]=function(){const _0x28e11d=_0x193f56;this[_0x28e11d(0x566)]();const _0xe5d9d8=$dataSystem[_0x28e11d(0x495)][_0x28e11d(0x768)],_0x42b17a=this[_0x28e11d(0x1f7)]();this[_0x28e11d(0x869)]=new Window_TitleCommand(_0x42b17a),this['_commandWindow'][_0x28e11d(0x57a)](_0xe5d9d8);const _0x48c721=this[_0x28e11d(0x1f7)]();this[_0x28e11d(0x869)]['move'](_0x48c721['x'],_0x48c721['y'],_0x48c721[_0x28e11d(0x890)],_0x48c721[_0x28e11d(0x89f)]),this['addWindow'](this['_commandWindow']);},Scene_Title['prototype'][_0x193f56(0x71e)]=function(){const _0x331e34=_0x193f56;if(this['_commandWindow']){if(_0x331e34(0x543)!=='BnuVA')return this[_0x331e34(0x869)][_0x331e34(0x180)]();else{if(_0x4f9767[_0x331e34(0x8f1)]>0x0)_0x26ff6b+=_0x9ae293+'\x0a\x0a\x0a\x0a\x0a';else{const _0x43c0fd=_0x455496[_0x6d307c][_0x331e34(0x41f)];_0x3572d0+=_0x3d8a6b+_0x331e34(0x6ac)[_0x331e34(0x627)](_0x458ec1,_0x43c0fd||_0x331e34(0x469))+_0x175204;}_0x1d0f1b+=_0x394658[_0x331e34(0x627)](_0x35ca44,_0x4ecd5e,_0x290732,_0x9292de);}}else return'YPjtg'!==_0x331e34(0x451)?VisuMZ['CoreEngine'][_0x331e34(0x7fe)]['TitleCommandList'][_0x331e34(0x8f1)]:_0x2c83a3(_0x30e1a3)['toLocaleString'](_0x246c08,_0x40b1da)+'.';},Scene_Title[_0x193f56(0x415)][_0x193f56(0x1f7)]=function(){const _0x3e1f38=_0x193f56;return VisuMZ[_0x3e1f38(0x818)][_0x3e1f38(0x7fe)]['MenuLayout']['Title'][_0x3e1f38(0x2d6)][_0x3e1f38(0x865)](this);},Scene_Title[_0x193f56(0x415)]['createTitleButtons']=function(){const _0x2ea14f=_0x193f56;for(const _0x4824d1 of Scene_Title['pictureButtons']){const _0x4c8242=new Sprite_TitlePictureButton(_0x4824d1);this[_0x2ea14f(0x6a3)](_0x4c8242);}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x1e8)]=Scene_Map['prototype'][_0x193f56(0x7c5)],Scene_Map[_0x193f56(0x415)]['initialize']=function(){const _0x4ff7e3=_0x193f56;VisuMZ[_0x4ff7e3(0x818)][_0x4ff7e3(0x1e8)][_0x4ff7e3(0x865)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x4ff7e3(0x5ef)]();},VisuMZ[_0x193f56(0x818)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x193f56(0x415)][_0x193f56(0x7f0)],Scene_Map[_0x193f56(0x415)][_0x193f56(0x7f0)]=function(){const _0x454aaf=_0x193f56;VisuMZ[_0x454aaf(0x818)][_0x454aaf(0x346)][_0x454aaf(0x865)](this),$gameTemp[_0x454aaf(0x116)]&&!$gameMessage[_0x454aaf(0x381)]()&&(this[_0x454aaf(0x817)](),SceneManager['updateEffekseer']());},Scene_Map[_0x193f56(0x415)]['terminate']=function(){const _0x29d7ed=_0x193f56;Scene_Message[_0x29d7ed(0x415)][_0x29d7ed(0x366)]['call'](this),!SceneManager[_0x29d7ed(0x50c)](Scene_Battle)&&(this[_0x29d7ed(0x3f1)][_0x29d7ed(0x4f0)](),this['_mapNameWindow'][_0x29d7ed(0x4de)](),this[_0x29d7ed(0x854)][_0x29d7ed(0x66c)]=![],SceneManager[_0x29d7ed(0x2fd)]()),$gameScreen['clearZoom'](),this[_0x29d7ed(0x5ef)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x19b)]=Scene_Map[_0x193f56(0x415)][_0x193f56(0x560)],Scene_Map['prototype']['createMenuButton']=function(){const _0x569fe8=_0x193f56;VisuMZ['CoreEngine'][_0x569fe8(0x19b)]['call'](this),SceneManager[_0x569fe8(0x434)]()&&this[_0x569fe8(0x291)]();},Scene_Map[_0x193f56(0x415)][_0x193f56(0x291)]=function(){const _0x3b2577=_0x193f56;this[_0x3b2577(0x81c)]['x']=Graphics[_0x3b2577(0x474)]+0x4;},VisuMZ[_0x193f56(0x818)]['Scene_Map_updateScene']=Scene_Map[_0x193f56(0x415)]['updateScene'],Scene_Map['prototype'][_0x193f56(0x7da)]=function(){const _0x1a4cb7=_0x193f56;VisuMZ[_0x1a4cb7(0x818)][_0x1a4cb7(0x392)]['call'](this),this[_0x1a4cb7(0x320)]();},Scene_Map['prototype'][_0x193f56(0x320)]=function(){const _0x32e851=_0x193f56;Input[_0x32e851(0x7f1)]('dashToggle')&&(ConfigManager[_0x32e851(0x410)]=!ConfigManager[_0x32e851(0x410)],ConfigManager['save']());},VisuMZ[_0x193f56(0x818)][_0x193f56(0x137)]=Scene_Map[_0x193f56(0x415)][_0x193f56(0x817)],Scene_Map[_0x193f56(0x415)]['updateMain']=function(){const _0x3cecd3=_0x193f56;VisuMZ[_0x3cecd3(0x818)][_0x3cecd3(0x137)][_0x3cecd3(0x865)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x193f56(0x415)][_0x193f56(0x5ef)]=function(){const _0x3242f4=_0x193f56;this[_0x3242f4(0x42c)]=[];},Scene_Map[_0x193f56(0x415)][_0x193f56(0x46c)]=function(){const _0x105bb2=_0x193f56;if(!this['_onceParallelInterpreters'])return;for(const _0x4bda49 of this[_0x105bb2(0x42c)]){_0x4bda49&&_0x4bda49[_0x105bb2(0x4f0)]();}},Scene_Map[_0x193f56(0x415)][_0x193f56(0x645)]=function(_0x56d660){const _0x3b7e00=_0x193f56,_0x4580f=$dataCommonEvents[_0x56d660];if(!_0x4580f)return;const _0x4a7b40=new Game_OnceParallelInterpreter();this[_0x3b7e00(0x4a9)](_0x4a7b40),_0x4a7b40[_0x3b7e00(0x605)](_0x56d660);},Scene_Map['prototype'][_0x193f56(0x4a9)]=function(_0x45dd0b){const _0x19efbd=_0x193f56;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this[_0x19efbd(0x42c)][_0x19efbd(0x8a7)](_0x45dd0b);},Scene_Map[_0x193f56(0x415)]['removeOnceParallelInterpreter']=function(_0x23677d){const _0x1f4e43=_0x193f56;this[_0x1f4e43(0x42c)]=this['_onceParallelInterpreters']||[],this[_0x1f4e43(0x42c)][_0x1f4e43(0x195)](_0x23677d);};function Game_OnceParallelInterpreter(){const _0x4d1a1e=_0x193f56;this[_0x4d1a1e(0x7c5)](...arguments);}Game_OnceParallelInterpreter[_0x193f56(0x415)]=Object['create'](Game_Interpreter[_0x193f56(0x415)]),Game_OnceParallelInterpreter['prototype'][_0x193f56(0x1a6)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x193f56(0x415)][_0x193f56(0x605)]=function(_0x1f2db8){const _0x291422=_0x193f56,_0x59fc43=$dataCommonEvents[_0x1f2db8];_0x59fc43?_0x291422(0x3df)===_0x291422(0x84d)?this[_0x291422(0x84f)](_0x1a7336['CoreEngine'][_0x291422(0x7fe)][_0x291422(0x132)][_0x291422(0x115)],_0xb7416d['x'],_0x189868['y'],_0x318acf[_0x291422(0x890)],_0x291422(0x5cf)):this[_0x291422(0x8df)](_0x59fc43[_0x291422(0x440)],0x0):this['terminate']();},Game_OnceParallelInterpreter[_0x193f56(0x415)][_0x193f56(0x366)]=function(){const _0xf4797a=_0x193f56;if(!SceneManager[_0xf4797a(0x637)]())return;SceneManager[_0xf4797a(0x87f)][_0xf4797a(0x4a5)](this),Game_Interpreter[_0xf4797a(0x415)][_0xf4797a(0x366)][_0xf4797a(0x865)](this);},VisuMZ[_0x193f56(0x818)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x193f56(0x415)]['helpAreaTop'],Scene_MenuBase['prototype']['helpAreaTop']=function(){const _0x36a047=_0x193f56;let _0x42e8fb=0x0;SceneManager[_0x36a047(0x69e)]()?_0x36a047(0x739)!=='qCcYc'?this['_forcedBattleSys']=_0x36a047(0x43c):_0x42e8fb=this[_0x36a047(0xff)]():_0x42e8fb=VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop']['call'](this);if(this[_0x36a047(0x2d1)]()&&this['getButtonAssistLocation']()==='top'){if('oJsmp'===_0x36a047(0x37e)){const _0x30b26c=_0xd3bc9d[_0x5dfae1][_0x36a047(0x41f)];_0x20def4+=_0x15412e+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x136ede,_0x30b26c||_0x36a047(0x469))+_0x14dc12;}else _0x42e8fb+=Window_ButtonAssist['prototype'][_0x36a047(0x7a2)]();}return _0x42e8fb;},Scene_MenuBase[_0x193f56(0x415)]['helpAreaTopSideButtonLayout']=function(){const _0x4cfcb4=_0x193f56;if(this['isBottomHelpMode']())return this[_0x4cfcb4(0x5d6)]();else{if('SDMGu'!==_0x4cfcb4(0x24f))return 0x0;else _0x589386=_0x12f7df['round'](_0x94fc13),_0x5a48aa=_0x4f196d[_0x4cfcb4(0x44b)](_0x4d3616),_0x1f43d8=_0x190a96['round'](_0x1e39d2),_0x4fdd99=_0x10bfa5['round'](_0x576286),_0x16533b=_0x59e0d2['round'](_0x52e438),_0x484595=_0x577728['round'](_0x51ec02),_0x27b2c4['CoreEngine'][_0x4cfcb4(0x273)][_0x4cfcb4(0x865)](this,_0x3b9c43,_0x2267de,_0x3363ca,_0x23aef8,_0x3dffef,_0x12e15a,_0x14f640,_0x15d993,_0x411c85),this['markCoreEngineModified']();}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x338)]=Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x2a0)],Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x2a0)]=function(){const _0x200a8e=_0x193f56;if(SceneManager['areButtonsOutsideMainUI']()){if(_0x200a8e(0x1f4)!==_0x200a8e(0x803))return this[_0x200a8e(0x266)]();else this[_0x200a8e(0x4cc)](_0x2bd4d5);}else return VisuMZ['CoreEngine'][_0x200a8e(0x338)][_0x200a8e(0x865)](this);},Scene_MenuBase[_0x193f56(0x415)]['mainAreaTopSideButtonLayout']=function(){const _0x52ace7=_0x193f56;if(!this[_0x52ace7(0x504)]()){if('milpM'!==_0x52ace7(0x8cd)){const _0x25ad84={'targets':_0x298f76,'animationId':_0x2ebecd,'mirror':_0x4837a4,'mute':_0x38e9fb};this[_0x52ace7(0x5a2)][_0x52ace7(0x8a7)](_0x25ad84);for(const _0x22caab of _0x1650c3){_0x22caab[_0x52ace7(0x8cc)]&&_0x22caab[_0x52ace7(0x8cc)]();}}else return this['helpAreaBottom']();}else return 0x0;},VisuMZ[_0x193f56(0x818)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase['prototype'][_0x193f56(0x690)],Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x690)]=function(){const _0x2a0415=_0x193f56;let _0x25c8ed=0x0;if(SceneManager[_0x2a0415(0x69e)]())_0x25c8ed=this['mainAreaHeightSideButtonLayout']();else{if(_0x2a0415(0x6a0)==='kaNnZ'){const _0x1e8ecc=_0x54ef78['FunctionName'][_0x2a0415(0x552)](/[ ]/g,''),_0x565b08=_0x8a3bb[_0x2a0415(0x14b)];_0x563000[_0x2a0415(0x818)][_0x2a0415(0x263)](_0x1e8ecc,_0x565b08);}else _0x25c8ed=VisuMZ[_0x2a0415(0x818)][_0x2a0415(0x852)][_0x2a0415(0x865)](this);}return this[_0x2a0415(0x2d1)]()&&this[_0x2a0415(0x4d9)]()!==_0x2a0415(0x8b3)&&(_0x25c8ed-=Window_ButtonAssist[_0x2a0415(0x415)]['lineHeight']()),_0x25c8ed;},Scene_MenuBase['prototype'][_0x193f56(0x3f0)]=function(){return Graphics['boxHeight']-this['helpAreaHeight']();},VisuMZ[_0x193f56(0x818)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x212)],Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x212)]=function(){const _0x3cbd6f=_0x193f56;this[_0x3cbd6f(0x514)]=new PIXI[(_0x3cbd6f(0x4fe))][(_0x3cbd6f(0x50e))](clamp=!![]),this[_0x3cbd6f(0x4bb)]=new Sprite(),this['_backgroundSprite'][_0x3cbd6f(0x481)]=SceneManager['backgroundBitmap'](),this[_0x3cbd6f(0x4bb)][_0x3cbd6f(0x4fe)]=[this[_0x3cbd6f(0x514)]],this[_0x3cbd6f(0x6a3)](this[_0x3cbd6f(0x4bb)]),this[_0x3cbd6f(0x437)](0xc0),this['setBackgroundOpacity'](this[_0x3cbd6f(0x166)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x166)]=function(){const _0x43c95e=_0x193f56,_0x298c99=String(this['constructor'][_0x43c95e(0x41f)]),_0x1ca415=this['getCustomBackgroundSettings'](_0x298c99);if(_0x1ca415)return _0x1ca415[_0x43c95e(0x292)];else{if(_0x43c95e(0x128)===_0x43c95e(0x128))return 0xc0;else{const _0x50902a=(_0x25ae74[_0x43c95e(0x818)][_0x43c95e(0x7fe)][_0x43c95e(0x8c9)]||_0x43c95e(0x5da))[_0x43c95e(0x125)]()[_0x43c95e(0x4f6)]();return _0x367ff4['CoreEngine'][_0x43c95e(0x5d5)](_0x50902a);}}},Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x513)]=function(){const _0xd6b94e=_0x193f56,_0x56db9b=String(this['constructor'][_0xd6b94e(0x41f)]),_0x470253=this['getCustomBackgroundSettings'](_0x56db9b);_0x470253&&(_0x470253[_0xd6b94e(0x351)]!==''||_0x470253['BgFilename2']!=='')&&(this[_0xd6b94e(0x55d)]=new Sprite(ImageManager[_0xd6b94e(0x6bc)](_0x470253['BgFilename1'])),this[_0xd6b94e(0x47a)]=new Sprite(ImageManager[_0xd6b94e(0x8eb)](_0x470253[_0xd6b94e(0x555)])),this[_0xd6b94e(0x6a3)](this[_0xd6b94e(0x55d)]),this[_0xd6b94e(0x6a3)](this[_0xd6b94e(0x47a)]),this[_0xd6b94e(0x55d)][_0xd6b94e(0x481)][_0xd6b94e(0x893)](this['adjustSprite'][_0xd6b94e(0x65c)](this,this[_0xd6b94e(0x55d)])),this[_0xd6b94e(0x47a)][_0xd6b94e(0x481)][_0xd6b94e(0x893)](this[_0xd6b94e(0x73b)][_0xd6b94e(0x65c)](this,this[_0xd6b94e(0x47a)])));},Scene_MenuBase[_0x193f56(0x415)]['getCustomBackgroundSettings']=function(_0x5cf807){const _0x660062=_0x193f56;return VisuMZ[_0x660062(0x818)]['Settings'][_0x660062(0x7d4)][_0x5cf807]||VisuMZ[_0x660062(0x818)][_0x660062(0x7fe)][_0x660062(0x7d4)][_0x660062(0x78b)];},Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x73b)]=function(_0x2a0753){const _0x24eec8=_0x193f56;this[_0x24eec8(0x508)](_0x2a0753),this[_0x24eec8(0x387)](_0x2a0753);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x58a)]=Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x8ec)],Scene_MenuBase['prototype'][_0x193f56(0x8ec)]=function(){const _0x4ca75d=_0x193f56;VisuMZ['CoreEngine']['Scene_MenuBase_createCancelButton'][_0x4ca75d(0x865)](this),SceneManager['isSideButtonLayout']()&&this[_0x4ca75d(0x857)]();},Scene_MenuBase[_0x193f56(0x415)]['moveCancelButtonSideButtonLayout']=function(){this['_cancelButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x368)]=Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x836)],Scene_MenuBase[_0x193f56(0x415)]['createPageButtons']=function(){const _0x521b2a=_0x193f56;VisuMZ['CoreEngine'][_0x521b2a(0x368)][_0x521b2a(0x865)](this);if(SceneManager[_0x521b2a(0x434)]()){if(_0x521b2a(0x403)===_0x521b2a(0x403))this[_0x521b2a(0x380)]();else return _0x57ba6f[_0x521b2a(0x818)]['Settings'][_0x521b2a(0x702)][_0x521b2a(0x1c5)]||_0x521b2a(0x5fe);}},Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x380)]=function(){const _0x54c29f=_0x193f56;this['_pageupButton']['x']=-0x1*(this[_0x54c29f(0x872)]['width']+this[_0x54c29f(0x3c0)][_0x54c29f(0x890)]+0x8),this[_0x54c29f(0x3c0)]['x']=-0x1*(this[_0x54c29f(0x3c0)][_0x54c29f(0x890)]+0x4);},Scene_MenuBase[_0x193f56(0x415)]['isMenuButtonAssistEnabled']=function(){const _0x3f6870=_0x193f56;return VisuMZ[_0x3f6870(0x818)]['Settings'][_0x3f6870(0x5a3)][_0x3f6870(0x29a)];},Scene_MenuBase['prototype'][_0x193f56(0x4d9)]=function(){const _0x55b64d=_0x193f56;return SceneManager[_0x55b64d(0x434)]()||SceneManager[_0x55b64d(0x135)]()?_0x55b64d(0x2f6)===_0x55b64d(0x8dd)?_0x55b64d(0x65e):VisuMZ[_0x55b64d(0x818)][_0x55b64d(0x7fe)][_0x55b64d(0x5a3)]['Location']:_0x55b64d(0x8b3);},Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x511)]=function(){const _0xae3167=_0x193f56;if(!this[_0xae3167(0x2d1)]())return;const _0x21825d=this[_0xae3167(0x45c)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x21825d),this[_0xae3167(0x835)](this[_0xae3167(0x7ab)]);},Scene_MenuBase[_0x193f56(0x415)]['buttonAssistWindowRect']=function(){const _0x50c51e=_0x193f56;return this[_0x50c51e(0x4d9)]()==='button'?this[_0x50c51e(0x789)]():this[_0x50c51e(0x3ac)]();},Scene_MenuBase[_0x193f56(0x415)][_0x193f56(0x789)]=function(){const _0x50df37=_0x193f56,_0x780864=ConfigManager[_0x50df37(0x2d2)]?(Sprite_Button[_0x50df37(0x415)][_0x50df37(0x7e9)]()+0x6)*0x2:0x0,_0x3e0a45=this[_0x50df37(0x65b)](),_0x44c180=Graphics[_0x50df37(0x474)]-_0x780864*0x2,_0xc79127=this[_0x50df37(0x69d)]();return new Rectangle(_0x780864,_0x3e0a45,_0x44c180,_0xc79127);},Scene_MenuBase['prototype']['buttonAssistWindowSideRect']=function(){const _0x3f9001=_0x193f56,_0x5280b4=Graphics[_0x3f9001(0x474)],_0x3b84cc=Window_ButtonAssist[_0x3f9001(0x415)]['lineHeight'](),_0x13e2c7=0x0;let _0x41b1c6=0x0;if(this[_0x3f9001(0x4d9)]()===_0x3f9001(0x72d))_0x41b1c6=0x0;else{if(_0x3f9001(0x4da)===_0x3f9001(0x8b0))return _0x105651&&this[_0x3f9001(0x80e)]?this[_0x3f9001(0x80e)][_0x3f9001(0x2bb)](_0x2a5536):_0x6eec65['CoreEngine'][_0x3f9001(0x75d)][_0x3f9001(0x865)](this,_0x16e682);else _0x41b1c6=Graphics[_0x3f9001(0x485)]-_0x3b84cc;}return new Rectangle(_0x13e2c7,_0x41b1c6,_0x5280b4,_0x3b84cc);},Scene_Menu[_0x193f56(0x711)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)]['MenuLayout'][_0x193f56(0x1b3)],VisuMZ[_0x193f56(0x818)][_0x193f56(0x50b)]=Scene_Menu['prototype']['create'],Scene_Menu[_0x193f56(0x415)][_0x193f56(0x1cd)]=function(){const _0xe8668a=_0x193f56;VisuMZ[_0xe8668a(0x818)][_0xe8668a(0x50b)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x193f56(0x415)]['setCoreEngineUpdateWindowBg']=function(){const _0x323fc8=_0x193f56;this[_0x323fc8(0x869)]&&this[_0x323fc8(0x869)][_0x323fc8(0x57a)](Scene_Menu['layoutSettings']['CommandBgType']);if(this[_0x323fc8(0x744)]){if(_0x323fc8(0x2ac)===_0x323fc8(0x66e))return _0x4fc45a;else this[_0x323fc8(0x744)][_0x323fc8(0x57a)](Scene_Menu['layoutSettings'][_0x323fc8(0x7e0)]);}this[_0x323fc8(0x39a)]&&(_0x323fc8(0x227)===_0x323fc8(0x22e)?this['isUseModernControls']()&&_0x5d8353&&this[_0x323fc8(0x550)]()===0x1&&this[_0x323fc8(0x791)]()===this[_0x323fc8(0x180)]()-0x1?this[_0x323fc8(0x13d)](0x0):_0x1c61a0['CoreEngine'][_0x323fc8(0x59b)][_0x323fc8(0x865)](this,_0x5cdac2):this[_0x323fc8(0x39a)]['setBackgroundType'](Scene_Menu['layoutSettings']['StatusBgType']));},Scene_Menu[_0x193f56(0x415)][_0x193f56(0x1f7)]=function(){const _0x5c11a5=_0x193f56;return Scene_Menu['layoutSettings'][_0x5c11a5(0x2d6)][_0x5c11a5(0x865)](this);},Scene_Menu[_0x193f56(0x415)][_0x193f56(0x3db)]=function(){const _0x19d543=_0x193f56;return Scene_Menu[_0x19d543(0x711)][_0x19d543(0x824)]['call'](this);},Scene_Menu[_0x193f56(0x415)][_0x193f56(0x6f7)]=function(){const _0x2c3df4=_0x193f56;return Scene_Menu['layoutSettings'][_0x2c3df4(0x28a)][_0x2c3df4(0x865)](this);},Scene_Item['layoutSettings']=VisuMZ['CoreEngine'][_0x193f56(0x7fe)][_0x193f56(0x210)][_0x193f56(0x4fc)],VisuMZ[_0x193f56(0x818)][_0x193f56(0x3b8)]=Scene_Item[_0x193f56(0x415)][_0x193f56(0x1cd)],Scene_Item[_0x193f56(0x415)]['create']=function(){const _0x17db36=_0x193f56;VisuMZ[_0x17db36(0x818)][_0x17db36(0x3b8)][_0x17db36(0x865)](this),this[_0x17db36(0x738)]();},Scene_Item[_0x193f56(0x415)][_0x193f56(0x738)]=function(){const _0x3c3d19=_0x193f56;this[_0x3c3d19(0x62a)]&&(_0x3c3d19(0x435)!==_0x3c3d19(0x435)?this['removePointAnimation'](_0x490f66):this[_0x3c3d19(0x62a)][_0x3c3d19(0x57a)](Scene_Item[_0x3c3d19(0x711)][_0x3c3d19(0x895)])),this[_0x3c3d19(0x569)]&&this[_0x3c3d19(0x569)][_0x3c3d19(0x57a)](Scene_Item['layoutSettings'][_0x3c3d19(0x2f3)]),this[_0x3c3d19(0x542)]&&this[_0x3c3d19(0x542)][_0x3c3d19(0x57a)](Scene_Item['layoutSettings'][_0x3c3d19(0x471)]),this[_0x3c3d19(0x8c8)]&&this[_0x3c3d19(0x8c8)][_0x3c3d19(0x57a)](Scene_Item['layoutSettings']['ActorBgType']);},Scene_Item[_0x193f56(0x415)][_0x193f56(0x43a)]=function(){const _0x562b06=_0x193f56;return Scene_Item['layoutSettings']['HelpRect'][_0x562b06(0x865)](this);},Scene_Item[_0x193f56(0x415)][_0x193f56(0x8d2)]=function(){const _0x2ad0da=_0x193f56;return Scene_Item[_0x2ad0da(0x711)]['CategoryRect']['call'](this);},Scene_Item[_0x193f56(0x415)]['itemWindowRect']=function(){const _0x7b8b28=_0x193f56;return Scene_Item[_0x7b8b28(0x711)][_0x7b8b28(0x214)][_0x7b8b28(0x865)](this);},Scene_Item['prototype']['actorWindowRect']=function(){const _0x59a8cb=_0x193f56;return Scene_Item['layoutSettings'][_0x59a8cb(0x5a0)][_0x59a8cb(0x865)](this);},Scene_Skill[_0x193f56(0x711)]=VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x210)]['SkillMenu'],VisuMZ[_0x193f56(0x818)][_0x193f56(0x863)]=Scene_Skill['prototype'][_0x193f56(0x1cd)],Scene_Skill[_0x193f56(0x415)][_0x193f56(0x1cd)]=function(){const _0x33de4d=_0x193f56;VisuMZ[_0x33de4d(0x818)][_0x33de4d(0x863)][_0x33de4d(0x865)](this),this[_0x33de4d(0x738)]();},Scene_Skill[_0x193f56(0x415)][_0x193f56(0x738)]=function(){const _0x3eb564=_0x193f56;this['_helpWindow']&&(_0x3eb564(0x2a9)!==_0x3eb564(0x328)?this[_0x3eb564(0x62a)]['setBackgroundType'](Scene_Skill[_0x3eb564(0x711)]['HelpBgType']):(this[_0x3eb564(0x1e7)]=_0x4adf8d,this[_0x3eb564(0x65f)]=_0x40ec79));this[_0x3eb564(0x7de)]&&this[_0x3eb564(0x7de)][_0x3eb564(0x57a)](Scene_Skill[_0x3eb564(0x711)][_0x3eb564(0x8f8)]);this[_0x3eb564(0x39a)]&&this[_0x3eb564(0x39a)][_0x3eb564(0x57a)](Scene_Skill[_0x3eb564(0x711)][_0x3eb564(0x5fd)]);if(this['_itemWindow']){if('tRqYo'===_0x3eb564(0x1ba)){const _0x174a95=_0x1a4d54[_0x3eb564(0x818)][_0x3eb564(0x7fe)]['ImgLoad'][_0x51348e],_0x28740c=_0x3eb564(0x492)['format'](_0x27609c);for(const _0xc055d0 of _0x174a95){_0x2ff51d['loadBitmap'](_0x28740c,_0xc055d0);}}else this[_0x3eb564(0x542)][_0x3eb564(0x57a)](Scene_Skill[_0x3eb564(0x711)][_0x3eb564(0x471)]);}this['_actorWindow']&&this[_0x3eb564(0x8c8)][_0x3eb564(0x57a)](Scene_Skill[_0x3eb564(0x711)][_0x3eb564(0x5d4)]);},Scene_Skill[_0x193f56(0x415)][_0x193f56(0x43a)]=function(){const _0x292d07=_0x193f56;return Scene_Skill['layoutSettings'][_0x292d07(0x547)][_0x292d07(0x865)](this);},Scene_Skill['prototype'][_0x193f56(0x1a7)]=function(){const _0x9cdd79=_0x193f56;return Scene_Skill[_0x9cdd79(0x711)][_0x9cdd79(0x68e)][_0x9cdd79(0x865)](this);},Scene_Skill[_0x193f56(0x415)][_0x193f56(0x6f7)]=function(){const _0x1882a7=_0x193f56;return Scene_Skill[_0x1882a7(0x711)][_0x1882a7(0x28a)][_0x1882a7(0x865)](this);},Scene_Skill[_0x193f56(0x415)][_0x193f56(0x2cb)]=function(){const _0x447c04=_0x193f56;return Scene_Skill['layoutSettings']['ItemRect'][_0x447c04(0x865)](this);},Scene_Skill[_0x193f56(0x415)]['actorWindowRect']=function(){const _0x433a57=_0x193f56;return Scene_Skill[_0x433a57(0x711)][_0x433a57(0x5a0)][_0x433a57(0x865)](this);},Scene_Equip[_0x193f56(0x711)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x210)]['EquipMenu'],VisuMZ[_0x193f56(0x818)][_0x193f56(0x845)]=Scene_Equip['prototype'][_0x193f56(0x1cd)],Scene_Equip[_0x193f56(0x415)][_0x193f56(0x1cd)]=function(){const _0x2f8ca6=_0x193f56;VisuMZ[_0x2f8ca6(0x818)][_0x2f8ca6(0x845)][_0x2f8ca6(0x865)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x193f56(0x415)][_0x193f56(0x738)]=function(){const _0x831d2c=_0x193f56;if(this['_helpWindow']){if(_0x831d2c(0x86a)===_0x831d2c(0x86a))this[_0x831d2c(0x62a)][_0x831d2c(0x57a)](Scene_Equip['layoutSettings'][_0x831d2c(0x895)]);else return _0x3f0397[_0x831d2c(0x818)]['Sprite_Gauge_gaugeRate'][_0x831d2c(0x865)](this)[_0x831d2c(0x12f)](0x0,0x1);}this[_0x831d2c(0x39a)]&&this[_0x831d2c(0x39a)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x831d2c(0x5fd)]);if(this[_0x831d2c(0x869)]){if(_0x831d2c(0x421)===_0x831d2c(0x202))return this['_fauxAnimationQueue'][_0x831d2c(0x73a)]();else this[_0x831d2c(0x869)]['setBackgroundType'](Scene_Equip[_0x831d2c(0x711)]['CommandBgType']);}this[_0x831d2c(0x7bb)]&&this[_0x831d2c(0x7bb)]['setBackgroundType'](Scene_Equip['layoutSettings']['SlotBgType']),this[_0x831d2c(0x542)]&&this[_0x831d2c(0x542)]['setBackgroundType'](Scene_Equip[_0x831d2c(0x711)][_0x831d2c(0x471)]);},Scene_Equip[_0x193f56(0x415)]['helpWindowRect']=function(){const _0x6df979=_0x193f56;return Scene_Equip[_0x6df979(0x711)][_0x6df979(0x547)][_0x6df979(0x865)](this);},Scene_Equip[_0x193f56(0x415)][_0x193f56(0x6f7)]=function(){const _0x181fb7=_0x193f56;return Scene_Equip[_0x181fb7(0x711)][_0x181fb7(0x28a)][_0x181fb7(0x865)](this);},Scene_Equip['prototype'][_0x193f56(0x1f7)]=function(){const _0xa61a7b=_0x193f56;return Scene_Equip[_0xa61a7b(0x711)][_0xa61a7b(0x2d6)]['call'](this);},Scene_Equip[_0x193f56(0x415)][_0x193f56(0x257)]=function(){const _0x32dbc1=_0x193f56;return Scene_Equip[_0x32dbc1(0x711)][_0x32dbc1(0x158)]['call'](this);},Scene_Equip['prototype'][_0x193f56(0x2cb)]=function(){const _0x35cd41=_0x193f56;return Scene_Equip['layoutSettings'][_0x35cd41(0x214)][_0x35cd41(0x865)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x210)][_0x193f56(0x454)],VisuMZ[_0x193f56(0x818)][_0x193f56(0x23e)]=Scene_Status['prototype'][_0x193f56(0x1cd)],Scene_Status['prototype']['create']=function(){const _0x3854d2=_0x193f56;VisuMZ[_0x3854d2(0x818)]['Scene_Status_create'][_0x3854d2(0x865)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x193f56(0x415)]['setCoreEngineUpdateWindowBg']=function(){const _0x4127d2=_0x193f56;this[_0x4127d2(0x2f9)]&&this[_0x4127d2(0x2f9)][_0x4127d2(0x57a)](Scene_Status[_0x4127d2(0x711)][_0x4127d2(0x270)]);if(this[_0x4127d2(0x39a)]){if(_0x4127d2(0x2a1)===_0x4127d2(0x321)){if(_0xc9ea7)_0x40d5bc[_0x4127d2(0x6ee)]();_0x56bb14[_0x4127d2(0x818)][_0x4127d2(0x60c)][_0x4127d2(0x865)](this);}else this[_0x4127d2(0x39a)][_0x4127d2(0x57a)](Scene_Status[_0x4127d2(0x711)][_0x4127d2(0x5fd)]);}if(this['_statusParamsWindow']){if(_0x4127d2(0x596)!==_0x4127d2(0x894))this[_0x4127d2(0x417)][_0x4127d2(0x57a)](Scene_Status[_0x4127d2(0x711)][_0x4127d2(0x2eb)]);else return _0x56637f(_0x278dfe['$1']);}this[_0x4127d2(0x179)]&&this[_0x4127d2(0x179)]['setBackgroundType'](Scene_Status[_0x4127d2(0x711)][_0x4127d2(0x85c)]);},Scene_Status[_0x193f56(0x415)][_0x193f56(0x256)]=function(){const _0x1ff057=_0x193f56;return Scene_Status[_0x1ff057(0x711)]['ProfileRect'][_0x1ff057(0x865)](this);},Scene_Status[_0x193f56(0x415)]['statusWindowRect']=function(){const _0x2af844=_0x193f56;return Scene_Status[_0x2af844(0x711)][_0x2af844(0x28a)]['call'](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x50f10d=_0x193f56;return Scene_Status[_0x50f10d(0x711)]['StatusParamsRect'][_0x50f10d(0x865)](this);},Scene_Status[_0x193f56(0x415)]['statusEquipWindowRect']=function(){const _0x2ec2b5=_0x193f56;return Scene_Status['layoutSettings'][_0x2ec2b5(0x1bb)]['call'](this);},Scene_Options['layoutSettings']=VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x210)][_0x193f56(0x573)],VisuMZ[_0x193f56(0x818)]['Scene_Options_create']=Scene_Options['prototype'][_0x193f56(0x1cd)],Scene_Options[_0x193f56(0x415)][_0x193f56(0x1cd)]=function(){const _0x423c97=_0x193f56;VisuMZ['CoreEngine']['Scene_Options_create'][_0x423c97(0x865)](this),this[_0x423c97(0x738)]();},Scene_Options[_0x193f56(0x415)]['setCoreEngineUpdateWindowBg']=function(){const _0x2536e3=_0x193f56;this[_0x2536e3(0x80b)]&&this[_0x2536e3(0x80b)]['setBackgroundType'](Scene_Options[_0x2536e3(0x711)][_0x2536e3(0x2e8)]);},Scene_Options['prototype'][_0x193f56(0x541)]=function(){const _0x42ee62=_0x193f56;return Scene_Options[_0x42ee62(0x711)][_0x42ee62(0x672)]['call'](this);},Scene_Save[_0x193f56(0x711)]=VisuMZ['CoreEngine'][_0x193f56(0x7fe)][_0x193f56(0x210)][_0x193f56(0x371)],Scene_Save['prototype'][_0x193f56(0x1cd)]=function(){const _0x349e5e=_0x193f56;Scene_File[_0x349e5e(0x415)][_0x349e5e(0x1cd)]['call'](this),this[_0x349e5e(0x738)]();},Scene_Save[_0x193f56(0x415)][_0x193f56(0x738)]=function(){const _0x22c954=_0x193f56;if(this[_0x22c954(0x62a)]){if('ttKZq'===_0x22c954(0x770))this[_0x22c954(0x62a)][_0x22c954(0x57a)](Scene_Save[_0x22c954(0x711)][_0x22c954(0x895)]);else{var _0x451a2c=_0x318458(_0x1981e4['$1']);_0x5a7cb6+=_0x451a2c;}}this[_0x22c954(0x5ee)]&&this[_0x22c954(0x5ee)][_0x22c954(0x57a)](Scene_Save['layoutSettings'][_0x22c954(0x181)]);},Scene_Save[_0x193f56(0x415)][_0x193f56(0x43a)]=function(){const _0x13d43d=_0x193f56;return Scene_Save[_0x13d43d(0x711)][_0x13d43d(0x547)][_0x13d43d(0x865)](this);},Scene_Save[_0x193f56(0x415)][_0x193f56(0x133)]=function(){const _0x5af2ce=_0x193f56;return Scene_Save[_0x5af2ce(0x711)][_0x5af2ce(0x8d8)][_0x5af2ce(0x865)](this);},Scene_Load['layoutSettings']=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x210)][_0x193f56(0x1de)],Scene_Load[_0x193f56(0x415)]['create']=function(){const _0x1f0634=_0x193f56;Scene_File['prototype'][_0x1f0634(0x1cd)][_0x1f0634(0x865)](this),this[_0x1f0634(0x738)]();},Scene_Load[_0x193f56(0x415)][_0x193f56(0x738)]=function(){const _0x45e2fd=_0x193f56;this[_0x45e2fd(0x62a)]&&this['_helpWindow'][_0x45e2fd(0x57a)](Scene_Load[_0x45e2fd(0x711)][_0x45e2fd(0x895)]),this[_0x45e2fd(0x5ee)]&&this[_0x45e2fd(0x5ee)][_0x45e2fd(0x57a)](Scene_Load[_0x45e2fd(0x711)][_0x45e2fd(0x181)]);},Scene_Load[_0x193f56(0x415)][_0x193f56(0x43a)]=function(){const _0x351557=_0x193f56;return Scene_Load[_0x351557(0x711)][_0x351557(0x547)][_0x351557(0x865)](this);},Scene_Load['prototype'][_0x193f56(0x133)]=function(){const _0x29dbcc=_0x193f56;return Scene_Load[_0x29dbcc(0x711)][_0x29dbcc(0x8d8)][_0x29dbcc(0x865)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x210)]['GameEnd'],VisuMZ[_0x193f56(0x818)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x193f56(0x415)]['createBackground'],Scene_GameEnd[_0x193f56(0x415)][_0x193f56(0x212)]=function(){const _0x52a8f6=_0x193f56;Scene_MenuBase[_0x52a8f6(0x415)][_0x52a8f6(0x212)][_0x52a8f6(0x865)](this);},Scene_GameEnd[_0x193f56(0x415)][_0x193f56(0x217)]=function(){const _0x321ca1=_0x193f56,_0x4e4540=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x4e4540),this[_0x321ca1(0x869)][_0x321ca1(0x14f)]('cancel',this[_0x321ca1(0x727)][_0x321ca1(0x65c)](this)),this[_0x321ca1(0x835)](this[_0x321ca1(0x869)]),this[_0x321ca1(0x869)][_0x321ca1(0x57a)](Scene_GameEnd['layoutSettings'][_0x321ca1(0x3ed)]);},Scene_GameEnd[_0x193f56(0x415)]['commandWindowRect']=function(){const _0x4c3929=_0x193f56;return Scene_GameEnd[_0x4c3929(0x711)][_0x4c3929(0x2d6)][_0x4c3929(0x865)](this);},Scene_Shop[_0x193f56(0x711)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x210)]['ShopMenu'],VisuMZ['CoreEngine'][_0x193f56(0x268)]=Scene_Shop[_0x193f56(0x415)][_0x193f56(0x1cd)],Scene_Shop[_0x193f56(0x415)]['create']=function(){const _0x11740c=_0x193f56;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x11740c(0x865)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x193f56(0x415)][_0x193f56(0x738)]=function(){const _0x275a8f=_0x193f56;if(this[_0x275a8f(0x62a)]){if('QoHyR'!==_0x275a8f(0x8cf)){const _0x293626=new _0x5ccdf9[(_0x275a8f(0x261))]();_0x293626[_0x275a8f(0x52c)](0x800,0x800),_0x288073[_0x275a8f(0x818)]['Settings'][_0x275a8f(0x168)]['PixelateImageRendering']&&(_0x293626[_0x275a8f(0x5cb)]=_0x5c6256[_0x275a8f(0x83b)][_0x275a8f(0x512)]),this[_0x275a8f(0x721)]['push'](_0x293626);}else this[_0x275a8f(0x62a)]['setBackgroundType'](Scene_Shop[_0x275a8f(0x711)][_0x275a8f(0x895)]);}this[_0x275a8f(0x744)]&&this[_0x275a8f(0x744)][_0x275a8f(0x57a)](Scene_Shop[_0x275a8f(0x711)][_0x275a8f(0x7e0)]);this[_0x275a8f(0x869)]&&this['_commandWindow']['setBackgroundType'](Scene_Shop[_0x275a8f(0x711)][_0x275a8f(0x3ed)]);this['_dummyWindow']&&this[_0x275a8f(0x7b0)][_0x275a8f(0x57a)](Scene_Shop[_0x275a8f(0x711)][_0x275a8f(0x6b2)]);if(this[_0x275a8f(0x6e6)]){if(_0x275a8f(0x10e)==='XRVZC')this[_0x275a8f(0x6e6)][_0x275a8f(0x57a)](Scene_Shop['layoutSettings'][_0x275a8f(0x354)]);else{_0x30a451[_0x275a8f(0x7d0)](_0x20192a,_0x3e03be);const _0x383da8=_0x49fc06[_0x275a8f(0x121)];_0xd7129d[_0x275a8f(0x8e3)](_0x383da8);}}this[_0x275a8f(0x39a)]&&this[_0x275a8f(0x39a)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x275a8f(0x5fd)]);this['_buyWindow']&&this['_buyWindow'][_0x275a8f(0x57a)](Scene_Shop[_0x275a8f(0x711)][_0x275a8f(0x898)]);if(this[_0x275a8f(0x569)]){if(_0x275a8f(0x453)!==_0x275a8f(0x453))try{_0xa2981e[_0x275a8f(0x818)]['Game_Character_processMoveCommand'][_0x275a8f(0x865)](this,_0x2cfdac);}catch(_0x2c02cf){if(_0x7ed822[_0x275a8f(0x450)]())_0x512a77[_0x275a8f(0x8d9)](_0x2c02cf);}else this[_0x275a8f(0x569)]['setBackgroundType'](Scene_Shop[_0x275a8f(0x711)][_0x275a8f(0x2f3)]);}this['_sellWindow']&&this[_0x275a8f(0x7f5)]['setBackgroundType'](Scene_Shop[_0x275a8f(0x711)][_0x275a8f(0x171)]);},Scene_Shop[_0x193f56(0x415)][_0x193f56(0x43a)]=function(){const _0x2b0b7c=_0x193f56;return Scene_Shop['layoutSettings'][_0x2b0b7c(0x547)][_0x2b0b7c(0x865)](this);},Scene_Shop['prototype'][_0x193f56(0x3db)]=function(){const _0x355895=_0x193f56;return Scene_Shop[_0x355895(0x711)]['GoldRect'][_0x355895(0x865)](this);},Scene_Shop[_0x193f56(0x415)]['commandWindowRect']=function(){const _0x5bbcb0=_0x193f56;return Scene_Shop[_0x5bbcb0(0x711)][_0x5bbcb0(0x2d6)]['call'](this);},Scene_Shop['prototype']['dummyWindowRect']=function(){const _0x264e13=_0x193f56;return Scene_Shop['layoutSettings'][_0x264e13(0x6d5)][_0x264e13(0x865)](this);},Scene_Shop[_0x193f56(0x415)][_0x193f56(0x4a8)]=function(){const _0x2431aa=_0x193f56;return Scene_Shop[_0x2431aa(0x711)]['NumberRect'][_0x2431aa(0x865)](this);},Scene_Shop[_0x193f56(0x415)][_0x193f56(0x6f7)]=function(){const _0x543ae5=_0x193f56;return Scene_Shop[_0x543ae5(0x711)][_0x543ae5(0x28a)][_0x543ae5(0x865)](this);},Scene_Shop['prototype'][_0x193f56(0x2b8)]=function(){const _0xf7355d=_0x193f56;return Scene_Shop['layoutSettings'][_0xf7355d(0x5ae)]['call'](this);},Scene_Shop[_0x193f56(0x415)][_0x193f56(0x8d2)]=function(){const _0x5b22bc=_0x193f56;return Scene_Shop[_0x5b22bc(0x711)][_0x5b22bc(0x201)][_0x5b22bc(0x865)](this);},Scene_Shop[_0x193f56(0x415)][_0x193f56(0x3e2)]=function(){const _0xadc15b=_0x193f56;return Scene_Shop[_0xadc15b(0x711)][_0xadc15b(0x4eb)][_0xadc15b(0x865)](this);},Scene_Name[_0x193f56(0x711)]=VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x210)][_0x193f56(0x203)],VisuMZ[_0x193f56(0x818)][_0x193f56(0x31a)]=Scene_Name[_0x193f56(0x415)]['create'],Scene_Name[_0x193f56(0x415)]['create']=function(){const _0x5164c6=_0x193f56;VisuMZ[_0x5164c6(0x818)][_0x5164c6(0x31a)][_0x5164c6(0x865)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x193f56(0x415)][_0x193f56(0x738)]=function(){const _0x5a4c74=_0x193f56;this['_editWindow']&&this['_editWindow'][_0x5a4c74(0x57a)](Scene_Name['layoutSettings'][_0x5a4c74(0x3ef)]);if(this[_0x5a4c74(0x86d)]){if('cpDIU'!==_0x5a4c74(0x71a))this[_0x5a4c74(0x86d)]['setBackgroundType'](Scene_Name[_0x5a4c74(0x711)][_0x5a4c74(0x4f3)]);else{var _0x2d1c12=_0x25e050(_0x13083e['$1']);_0x601800*=_0x2d1c12;}}},Scene_Name[_0x193f56(0x415)][_0x193f56(0x586)]=function(){return 0x0;},Scene_Name[_0x193f56(0x415)][_0x193f56(0x73c)]=function(){const _0x1a054b=_0x193f56;return Scene_Name[_0x1a054b(0x711)]['EditRect'][_0x1a054b(0x865)](this);},Scene_Name['prototype'][_0x193f56(0x213)]=function(){return Scene_Name['layoutSettings']['InputRect']['call'](this);},Scene_Name['prototype'][_0x193f56(0x46b)]=function(){const _0x38ffa1=_0x193f56;if(!this[_0x38ffa1(0x86d)])return![];return VisuMZ[_0x38ffa1(0x818)][_0x38ffa1(0x7fe)][_0x38ffa1(0x26a)][_0x38ffa1(0x46b)];},Scene_Name['prototype'][_0x193f56(0x20e)]=function(){const _0x290dcf=_0x193f56;if(this[_0x290dcf(0x46b)]())return TextManager['getInputButtonString']('tab');else{if(_0x290dcf(0x1d9)===_0x290dcf(0x297)){if(_0x484d7a)_0x53991f[_0x290dcf(0x2a5)](_0x31b822);}else return Scene_MenuBase[_0x290dcf(0x415)][_0x290dcf(0x20e)][_0x290dcf(0x865)](this);}},Scene_Name[_0x193f56(0x415)][_0x193f56(0x4a6)]=function(){const _0x17f42b=_0x193f56;if(this['EnableNameInput']()){if('yBFDu'!==_0x17f42b(0x635)){const _0xd69e76=VisuMZ[_0x17f42b(0x818)]['Settings']['KeyboardInput'];return this[_0x17f42b(0x86d)][_0x17f42b(0x57f)]===_0x17f42b(0x35e)?'bsJlp'===_0x17f42b(0x79e)?typeof _0x580a80===_0x17f42b(0x69f)?_0x57c9b7[_0x17f42b(0x818)]['TextManager_param']['call'](this,_0x333530):this[_0x17f42b(0x5e6)](_0x33428c):_0xd69e76[_0x17f42b(0x69b)]||_0x17f42b(0x69b):_0x17f42b(0x27d)==='IKZUU'?_0xd69e76['Manual']||_0x17f42b(0x6cb):_0x58f331[_0x17f42b(0x711)][_0x17f42b(0x1bb)][_0x17f42b(0x865)](this);}else{let _0x31ba42=_0x45902a['CoreEngine'][_0x17f42b(0x3b2)]['call'](this);return _0x31ba42;}}else{if(_0x17f42b(0x1a1)!==_0x17f42b(0x1d1))return Scene_MenuBase[_0x17f42b(0x415)][_0x17f42b(0x4a6)][_0x17f42b(0x865)](this);else{const _0x569c66=_0x3591f6[_0x17f42b(0x818)][_0x17f42b(0x7fe)][_0x17f42b(0x899)];if(_0x569c66[_0x17f42b(0x41e)]===![])return;_0x569c66[_0x17f42b(0x7e2)]?_0x569c66[_0x17f42b(0x7e2)]['call'](this,_0xce96ec):_0x2ef1a2[_0x17f42b(0x818)][_0x17f42b(0x326)][_0x17f42b(0x865)](this,_0x22bc1d);}}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x262)]=Scene_Name['prototype'][_0x193f56(0x6ab)],Scene_Name['prototype'][_0x193f56(0x6ab)]=function(){const _0x3aa136=_0x193f56;if(this['doesNameContainBannedWords']()){if(_0x3aa136(0x39b)!==_0x3aa136(0x39b)){if(_0x187655[_0x3aa136(0x6d7)]())return![];return this[_0x3aa136(0x41f)]()&&this[_0x3aa136(0x41f)]()[_0x3aa136(0x37b)](0x0)==='!';}else this[_0x3aa136(0x2d3)]();}else{if(_0x3aa136(0x58f)!==_0x3aa136(0x27a))VisuMZ[_0x3aa136(0x818)][_0x3aa136(0x262)]['call'](this);else return _0x43faa7[_0x3aa136(0x711)][_0x3aa136(0x201)]['call'](this);}},Scene_Name['prototype'][_0x193f56(0x592)]=function(){const _0x5de541=_0x193f56,_0x580654=VisuMZ['CoreEngine'][_0x5de541(0x7fe)]['KeyboardInput'];if(!_0x580654)return![];const _0x5902c8=_0x580654[_0x5de541(0x790)];if(!_0x5902c8)return![];const _0xbc184b=this[_0x5de541(0x54d)][_0x5de541(0x41f)]()['toLowerCase']();for(const _0x6cae54 of _0x5902c8){if('wdnkb'===_0x5de541(0x4f1)){if(_0xbc184b[_0x5de541(0x267)](_0x6cae54['toLowerCase']()))return!![];}else _0xc66b10['CoreEngine'][_0x5de541(0x19b)]['call'](this),_0x1fa01c[_0x5de541(0x434)]()&&this['moveMenuButtonSideButtonLayout']();}return![];},Scene_Name['prototype'][_0x193f56(0x2d3)]=function(){SoundManager['playBuzzer']();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x8db)]=Scene_Battle[_0x193f56(0x415)]['update'],Scene_Battle[_0x193f56(0x415)][_0x193f56(0x4f0)]=function(){const _0x3facd0=_0x193f56;VisuMZ[_0x3facd0(0x818)]['Scene_Battle_update'][_0x3facd0(0x865)](this);if($gameTemp[_0x3facd0(0x116)])this[_0x3facd0(0x7b3)]();},Scene_Battle['prototype'][_0x193f56(0x7b3)]=function(){const _0x501c5b=_0x193f56;!BattleManager['isInputting']()&&!this[_0x501c5b(0x39e)]&&!$gameMessage[_0x501c5b(0x381)]()&&(this[_0x501c5b(0x39e)]=!![],this['update'](),SceneManager[_0x501c5b(0x729)](),this['_playtestF7Looping']=![]);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x6d9)]=Scene_Battle['prototype']['createCancelButton'],Scene_Battle['prototype'][_0x193f56(0x8ec)]=function(){const _0x5baa6b=_0x193f56;VisuMZ[_0x5baa6b(0x818)]['Scene_Battle_createCancelButton']['call'](this),SceneManager[_0x5baa6b(0x434)]()&&this[_0x5baa6b(0x3bf)]();},Scene_Battle[_0x193f56(0x415)]['repositionCancelButtonSideButtonLayout']=function(){const _0x4bf811=_0x193f56;this[_0x4bf811(0x229)]['x']=Graphics['boxWidth']+0x4,this[_0x4bf811(0x2b1)]()?_0x4bf811(0x2a8)===_0x4bf811(0x3bc)?(this[_0x4bf811(0x551)](_0x4bf811(0x6b7)),this[_0x4bf811(0x6cd)]=_0x3d1c50):this[_0x4bf811(0x229)]['y']=Graphics['boxHeight']-this[_0x4bf811(0x69d)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x8be)]=Sprite_Button[_0x193f56(0x415)][_0x193f56(0x7c5)],Sprite_Button[_0x193f56(0x415)]['initialize']=function(_0x28eb48){const _0xdd7b23=_0x193f56;VisuMZ['CoreEngine'][_0xdd7b23(0x8be)][_0xdd7b23(0x865)](this,_0x28eb48),this['initButtonHidden']();},Sprite_Button[_0x193f56(0x415)][_0x193f56(0x54a)]=function(){const _0x157513=_0x193f56,_0xa50ea7=VisuMZ['CoreEngine']['Settings']['UI'];this[_0x157513(0x63f)]=![];switch(this['_buttonType']){case _0x157513(0x617):this[_0x157513(0x63f)]=!_0xa50ea7['cancelShowButton'];break;case _0x157513(0x7a5):case _0x157513(0x62d):this[_0x157513(0x63f)]=!_0xa50ea7['pagedownShowButton'];break;case _0x157513(0x1b0):case'up':case _0x157513(0x5dc):case _0x157513(0x84a):case'ok':this[_0x157513(0x63f)]=!_0xa50ea7[_0x157513(0x741)];break;case'menu':this[_0x157513(0x63f)]=!_0xa50ea7[_0x157513(0x220)];break;}},VisuMZ['CoreEngine']['Sprite_Button_updateOpacity']=Sprite_Button['prototype'][_0x193f56(0x86b)],Sprite_Button[_0x193f56(0x415)][_0x193f56(0x86b)]=function(){const _0x48052d=_0x193f56;SceneManager['areButtonsHidden']()||this[_0x48052d(0x63f)]?this[_0x48052d(0x457)]():VisuMZ[_0x48052d(0x818)]['Sprite_Button_updateOpacity'][_0x48052d(0x865)](this);},Sprite_Button['prototype'][_0x193f56(0x457)]=function(){const _0x5d433a=_0x193f56;this[_0x5d433a(0x66c)]=![],this['opacity']=0x0,this['x']=Graphics[_0x5d433a(0x890)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x193f56(0x818)]['Sprite_Battler_startMove']=Sprite_Battler[_0x193f56(0x415)][_0x193f56(0x7cc)],Sprite_Battler[_0x193f56(0x415)][_0x193f56(0x7cc)]=function(_0x5f1527,_0x5002cb,_0x57f862){const _0x35d9d3=_0x193f56;if(this[_0x35d9d3(0x8ed)]!==_0x5f1527||this[_0x35d9d3(0x4b2)]!==_0x5002cb){if('mqytp'===_0x35d9d3(0x452)){if(this['_action'][_0x35d9d3(0x67e)]())return![];return _0x523460[_0x35d9d3(0x818)]['BattleManager_checkSubstitute'][_0x35d9d3(0x865)](this,_0x16a06f);}else this[_0x35d9d3(0x551)](_0x35d9d3(0x6b7)),this['_movementWholeDuration']=_0x57f862;}VisuMZ[_0x35d9d3(0x818)]['Sprite_Battler_startMove'][_0x35d9d3(0x865)](this,_0x5f1527,_0x5002cb,_0x57f862);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x4c2df7){const _0x2978c6=_0x193f56;this[_0x2978c6(0x3ad)]=_0x4c2df7;},Sprite_Battler[_0x193f56(0x415)][_0x193f56(0x685)]=function(){const _0x586980=_0x193f56;if(this[_0x586980(0x4c2)]<=0x0)return;const _0xbd2be8=this['_movementDuration'],_0xb5ce3e=this[_0x586980(0x6cd)],_0x16811d=this[_0x586980(0x3ad)];this['_offsetX']=this[_0x586980(0x536)](this[_0x586980(0x707)],this[_0x586980(0x8ed)],_0xbd2be8,_0xb5ce3e,_0x16811d),this['_offsetY']=this[_0x586980(0x536)](this[_0x586980(0x38a)],this[_0x586980(0x4b2)],_0xbd2be8,_0xb5ce3e,_0x16811d),this[_0x586980(0x4c2)]--;if(this[_0x586980(0x4c2)]<=0x0)this[_0x586980(0x808)]();},Sprite_Battler['prototype'][_0x193f56(0x536)]=function(_0x1dc6ab,_0x4047b3,_0x2d84db,_0x26e0e8,_0x17e13d){const _0x2c69e1=_0x193f56,_0x557a6b=VisuMZ['ApplyEasing']((_0x26e0e8-_0x2d84db)/_0x26e0e8,_0x17e13d||_0x2c69e1(0x6b7)),_0x3a7b78=VisuMZ[_0x2c69e1(0x737)]((_0x26e0e8-_0x2d84db+0x1)/_0x26e0e8,_0x17e13d||_0x2c69e1(0x6b7)),_0x4b3885=(_0x1dc6ab-_0x4047b3*_0x557a6b)/(0x1-_0x557a6b);return _0x4b3885+(_0x4047b3-_0x4b3885)*_0x3a7b78;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x885)]=Sprite_Actor['prototype'][_0x193f56(0x17c)],Sprite_Actor['prototype'][_0x193f56(0x17c)]=function(_0x2a32cb){const _0x161212=_0x193f56;if(VisuMZ[_0x161212(0x818)][_0x161212(0x7fe)]['UI']['RepositionActors']){if(_0x161212(0x63c)!==_0x161212(0x63c)){if(_0x198d06[_0x161212(0x450)]())_0x4994c8[_0x161212(0x8d9)](_0xc2d457);}else this[_0x161212(0x87e)](_0x2a32cb);}else VisuMZ[_0x161212(0x818)][_0x161212(0x885)][_0x161212(0x865)](this,_0x2a32cb);},Sprite_Actor['prototype']['setActorHomeRepositioned']=function(_0x3eff03){const _0x50e959=_0x193f56;let _0x5d6ba6=Math['round'](Graphics['width']/0x2+0xc0);_0x5d6ba6-=Math['floor']((Graphics[_0x50e959(0x890)]-Graphics[_0x50e959(0x474)])/0x2),_0x5d6ba6+=_0x3eff03*0x20;let _0x90affa=Graphics[_0x50e959(0x89f)]-0xc8-$gameParty[_0x50e959(0x34c)]()*0x30;_0x90affa-=Math['floor']((Graphics['height']-Graphics['boxHeight'])/0x2),_0x90affa+=_0x3eff03*0x30,this[_0x50e959(0x668)](_0x5d6ba6,_0x90affa);},Sprite_Actor['prototype'][_0x193f56(0x779)]=function(){const _0x4ccdac=_0x193f56;this[_0x4ccdac(0x7cc)](0x4b0,0x0,0x78);},Sprite_Animation[_0x193f56(0x415)][_0x193f56(0x4bf)]=function(_0x3c0ea0){this['_muteSound']=_0x3c0ea0;},VisuMZ['CoreEngine'][_0x193f56(0x6f0)]=Sprite_Animation['prototype']['processSoundTimings'],Sprite_Animation[_0x193f56(0x415)]['processSoundTimings']=function(){const _0x248a5b=_0x193f56;if(this[_0x248a5b(0x757)])return;VisuMZ[_0x248a5b(0x818)][_0x248a5b(0x6f0)][_0x248a5b(0x865)](this);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x11e)]=Sprite_Animation[_0x193f56(0x415)][_0x193f56(0x6d2)],Sprite_Animation['prototype'][_0x193f56(0x6d2)]=function(_0x49bf05){const _0x155308=_0x193f56;this[_0x155308(0x7ba)]()?'bLraM'!==_0x155308(0x5f2)?_0x59e40d+=_0x1941f5(_0x19c061):this[_0x155308(0x191)](_0x49bf05):VisuMZ[_0x155308(0x818)]['Sprite_Animation_setViewport'][_0x155308(0x865)](this,_0x49bf05);},Sprite_Animation[_0x193f56(0x415)][_0x193f56(0x7ba)]=function(){const _0x164b38=_0x193f56;if(!this[_0x164b38(0x11a)])return![];const _0x5a6649=this[_0x164b38(0x11a)]['name']||'';if(_0x5a6649[_0x164b38(0x3d7)](/<MIRROR OFFSET X>/i))return!![];if(_0x5a6649[_0x164b38(0x3d7)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine'][_0x164b38(0x7fe)][_0x164b38(0x168)][_0x164b38(0x226)];},Sprite_Animation[_0x193f56(0x415)][_0x193f56(0x191)]=function(_0x3fb173){const _0x29a64d=_0x193f56,_0x13c3bf=this[_0x29a64d(0x219)],_0x2f475e=this[_0x29a64d(0x219)],_0x59d212=this[_0x29a64d(0x11a)]['offsetX']*(this[_0x29a64d(0x269)]?-0x1:0x1)-_0x13c3bf/0x2,_0x24e80f=this[_0x29a64d(0x11a)][_0x29a64d(0x697)]-_0x2f475e/0x2,_0x50e3fc=this[_0x29a64d(0x57c)](_0x3fb173);_0x3fb173['gl'][_0x29a64d(0x154)](_0x59d212+_0x50e3fc['x'],_0x24e80f+_0x50e3fc['y'],_0x13c3bf,_0x2f475e);},Sprite_Animation[_0x193f56(0x415)][_0x193f56(0x52a)]=function(_0x515b20){const _0x1d3d1e=_0x193f56;if(_0x515b20[_0x1d3d1e(0x129)]){}const _0xe225b8=this['_animation'][_0x1d3d1e(0x41f)];let _0x1e24d6=_0x515b20[_0x1d3d1e(0x89f)]*_0x515b20[_0x1d3d1e(0x1d8)]['y'],_0x5b2b0b=0x0,_0x415cbd=-_0x1e24d6/0x2;if(_0xe225b8[_0x1d3d1e(0x3d7)](/<(?:HEAD|HEADER|TOP)>/i))_0x415cbd=-_0x1e24d6;if(_0xe225b8[_0x1d3d1e(0x3d7)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x415cbd=0x0;if(this[_0x1d3d1e(0x11a)][_0x1d3d1e(0x8ad)])_0x415cbd=0x0;if(_0xe225b8[_0x1d3d1e(0x3d7)](/<(?:LEFT)>/i))_0x5b2b0b=-_0x515b20[_0x1d3d1e(0x890)]/0x2;if(_0xe225b8[_0x1d3d1e(0x3d7)](/<(?:RIGHT)>/i))_0x5b2b0b=_0x515b20[_0x1d3d1e(0x890)]/0x2;_0xe225b8[_0x1d3d1e(0x3d7)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x5b2b0b=Number(RegExp['$1'])*_0x515b20['width']);_0xe225b8[_0x1d3d1e(0x3d7)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x1d3d1e(0x20f)===_0x1d3d1e(0x20f)?_0x415cbd=(0x1-Number(RegExp['$1']))*-_0x1e24d6:this[_0x1d3d1e(0x6e6)][_0x1d3d1e(0x57a)](_0x237e4e[_0x1d3d1e(0x711)][_0x1d3d1e(0x354)]));_0xe225b8['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x5b2b0b=Number(RegExp['$1'])*_0x515b20[_0x1d3d1e(0x890)],_0x415cbd=(0x1-Number(RegExp['$2']))*-_0x1e24d6);if(_0xe225b8[_0x1d3d1e(0x3d7)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x5b2b0b+=Number(RegExp['$1']);if(_0xe225b8[_0x1d3d1e(0x3d7)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x415cbd+=Number(RegExp['$1']);_0xe225b8['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x5b2b0b+=Number(RegExp['$1']),_0x415cbd+=Number(RegExp['$2']));const _0x15f21c=new Point(_0x5b2b0b,_0x415cbd);return _0x515b20['updateTransform'](),_0x515b20[_0x1d3d1e(0x12e)][_0x1d3d1e(0x1d4)](_0x15f21c);},Sprite_AnimationMV[_0x193f56(0x415)]['setupRate']=function(){const _0x1c7b5c=_0x193f56;this[_0x1c7b5c(0x394)]=VisuMZ[_0x1c7b5c(0x818)]['Settings']['QoL'][_0x1c7b5c(0x51e)]??0x4,this[_0x1c7b5c(0x819)](),this[_0x1c7b5c(0x394)]=this[_0x1c7b5c(0x394)][_0x1c7b5c(0x12f)](0x1,0xa);},Sprite_AnimationMV[_0x193f56(0x415)][_0x193f56(0x819)]=function(){const _0x51c0a8=_0x193f56;if(!this[_0x51c0a8(0x11a)]);const _0x206bf6=this[_0x51c0a8(0x11a)][_0x51c0a8(0x41f)]||'';_0x206bf6[_0x51c0a8(0x3d7)](/<RATE:[ ](\d+)>/i)&&(this[_0x51c0a8(0x394)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0x193f56(0x415)][_0x193f56(0x4bf)]=function(_0x1fbd39){this['_muteSound']=_0x1fbd39;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x8a3)]=Sprite_AnimationMV[_0x193f56(0x415)][_0x193f56(0x67f)],Sprite_AnimationMV[_0x193f56(0x415)][_0x193f56(0x67f)]=function(_0x11c95d){const _0x4ee4b6=_0x193f56;this['_muteSound']&&(_0x11c95d=JsonEx[_0x4ee4b6(0x5e0)](_0x11c95d),_0x11c95d['se']&&(_0x11c95d['se'][_0x4ee4b6(0x428)]=0x0)),VisuMZ['CoreEngine'][_0x4ee4b6(0x8a3)][_0x4ee4b6(0x865)](this,_0x11c95d);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x761)]=Sprite_AnimationMV[_0x193f56(0x415)][_0x193f56(0x2f2)],Sprite_AnimationMV[_0x193f56(0x415)][_0x193f56(0x2f2)]=function(){const _0x3535de=_0x193f56;VisuMZ['CoreEngine'][_0x3535de(0x761)]['call'](this);if(this[_0x3535de(0x11a)][_0x3535de(0x6e0)]===0x3){if(this['x']===0x0)this['x']=Math[_0x3535de(0x44b)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math[_0x3535de(0x44b)](Graphics[_0x3535de(0x89f)]/0x2);}},Sprite_Damage[_0x193f56(0x415)]['createDigits']=function(_0x5b5b68){const _0x331af3=_0x193f56;let _0x1e5d1b=Math['abs'](_0x5b5b68)[_0x331af3(0x8e4)]();this['useDigitGrouping']()&&(_0x1e5d1b=VisuMZ['GroupDigits'](_0x1e5d1b));const _0x5610dc=this[_0x331af3(0x5dd)](),_0x6b6362=Math[_0x331af3(0x66d)](_0x5610dc*0.75);for(let _0x1221a6=0x0;_0x1221a6<_0x1e5d1b[_0x331af3(0x8f1)];_0x1221a6++){if(_0x331af3(0x3dd)===_0x331af3(0x377))this[_0x331af3(0x17e)](0x0);else{const _0x2b7699=this[_0x331af3(0x8e6)](_0x6b6362,_0x5610dc);_0x2b7699['bitmap'][_0x331af3(0x84f)](_0x1e5d1b[_0x1221a6],0x0,0x0,_0x6b6362,_0x5610dc,_0x331af3(0x6aa)),_0x2b7699['x']=(_0x1221a6-(_0x1e5d1b[_0x331af3(0x8f1)]-0x1)/0x2)*_0x6b6362,_0x2b7699['dy']=-_0x1221a6;}}},Sprite_Damage['prototype']['useDigitGrouping']=function(){const _0x8dd41=_0x193f56;return VisuMZ['CoreEngine'][_0x8dd41(0x7fe)][_0x8dd41(0x168)][_0x8dd41(0x150)];},Sprite_Damage[_0x193f56(0x415)][_0x193f56(0x329)]=function(){const _0x2beffa=_0x193f56;return ColorManager[_0x2beffa(0x7c0)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x760)]=Sprite_Gauge[_0x193f56(0x415)][_0x193f56(0x763)],Sprite_Gauge[_0x193f56(0x415)][_0x193f56(0x763)]=function(){const _0x47791b=_0x193f56;return VisuMZ[_0x47791b(0x818)][_0x47791b(0x760)]['call'](this)[_0x47791b(0x12f)](0x0,0x1);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x3b2)]=Sprite_Gauge[_0x193f56(0x415)]['currentValue'],Sprite_Gauge['prototype'][_0x193f56(0x2af)]=function(){const _0x370cd5=_0x193f56;let _0x454b88=VisuMZ[_0x370cd5(0x818)]['Sprite_Gauge_currentValue'][_0x370cd5(0x865)](this);return _0x454b88;},Sprite_Gauge['prototype'][_0x193f56(0x4c3)]=function(){const _0x4f40c6=_0x193f56;let _0x5f41fd=this[_0x4f40c6(0x2af)]();this[_0x4f40c6(0x7e4)]()&&(_0x5f41fd=VisuMZ[_0x4f40c6(0x164)](_0x5f41fd));const _0x562c96=this['bitmapWidth']()-0x1,_0x1133d6=this[_0x4f40c6(0x7c8)]?this['textHeight']():this[_0x4f40c6(0x80d)]();this['setupValueFont'](),this['bitmap']['drawText'](_0x5f41fd,0x0,0x0,_0x562c96,_0x1133d6,_0x4f40c6(0x5cf));},Sprite_Gauge[_0x193f56(0x415)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x193f56(0x415)][_0x193f56(0x7e4)]=function(){const _0x1a9d3d=_0x193f56;return VisuMZ[_0x1a9d3d(0x818)][_0x1a9d3d(0x7fe)][_0x1a9d3d(0x168)][_0x1a9d3d(0x2b0)];},Sprite_Gauge[_0x193f56(0x415)][_0x193f56(0x329)]=function(){const _0x1a5149=_0x193f56;return ColorManager[_0x1a5149(0x3b0)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x5ff)]=Sprite_Picture[_0x193f56(0x415)][_0x193f56(0x87b)],Sprite_Picture[_0x193f56(0x415)][_0x193f56(0x87b)]=function(){const _0x2a8780=_0x193f56;if(this['_pictureName']['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i))this[_0x2a8780(0x278)](Number(RegExp['$1']));else{if('jMSDh'===_0x2a8780(0x2f1))return this[_0x2a8780(0x2e7)];else VisuMZ[_0x2a8780(0x818)][_0x2a8780(0x5ff)][_0x2a8780(0x865)](this);}},Sprite_Picture['prototype'][_0x193f56(0x278)]=function(_0x1dd76f){const _0x4c8c1f=_0x193f56,_0x3520e3=ImageManager[_0x4c8c1f(0x776)],_0x5c591d=ImageManager[_0x4c8c1f(0x8de)],_0x4a33f6=this[_0x4c8c1f(0x8c3)][_0x4c8c1f(0x3d7)](/SMOOTH/i);this[_0x4c8c1f(0x481)]=new Bitmap(_0x3520e3,_0x5c591d);const _0x20806e=ImageManager[_0x4c8c1f(0x1ce)](_0x4c8c1f(0x234)),_0x6450d9=_0x1dd76f%0x10*_0x3520e3,_0x8f7c86=Math[_0x4c8c1f(0x66d)](_0x1dd76f/0x10)*_0x5c591d;this[_0x4c8c1f(0x481)][_0x4c8c1f(0x506)]=_0x4a33f6,this[_0x4c8c1f(0x481)][_0x4c8c1f(0x254)](_0x20806e,_0x6450d9,_0x8f7c86,_0x3520e3,_0x5c591d,0x0,0x0,_0x3520e3,_0x5c591d);};function Sprite_TitlePictureButton(){const _0x30a1e0=_0x193f56;this[_0x30a1e0(0x7c5)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x193f56(0x1cd)](Sprite_Clickable[_0x193f56(0x415)]),Sprite_TitlePictureButton[_0x193f56(0x415)][_0x193f56(0x1a6)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(_0x50c3a8){const _0x300bf5=_0x193f56;Sprite_Clickable[_0x300bf5(0x415)][_0x300bf5(0x7c5)][_0x300bf5(0x865)](this),this[_0x300bf5(0x54f)]=_0x50c3a8,this[_0x300bf5(0x6fb)]=null,this[_0x300bf5(0x8df)]();},Sprite_TitlePictureButton[_0x193f56(0x415)][_0x193f56(0x8df)]=function(){const _0x4641dd=_0x193f56;this['x']=Graphics[_0x4641dd(0x890)],this['y']=Graphics[_0x4641dd(0x89f)],this[_0x4641dd(0x66c)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x193f56(0x415)][_0x193f56(0x255)]=function(){const _0x3941d4=_0x193f56;this[_0x3941d4(0x481)]=ImageManager[_0x3941d4(0x540)](this[_0x3941d4(0x54f)][_0x3941d4(0x27b)]),this[_0x3941d4(0x481)][_0x3941d4(0x893)](this[_0x3941d4(0x1bf)][_0x3941d4(0x65c)](this));},Sprite_TitlePictureButton[_0x193f56(0x415)][_0x193f56(0x1bf)]=function(){const _0x114459=_0x193f56;this[_0x114459(0x54f)][_0x114459(0x64f)][_0x114459(0x865)](this),this[_0x114459(0x54f)][_0x114459(0x604)]['call'](this),this['setClickHandler'](this['_data'][_0x114459(0x880)][_0x114459(0x65c)](this));},Sprite_TitlePictureButton['prototype']['update']=function(){const _0x2383d7=_0x193f56;Sprite_Clickable[_0x2383d7(0x415)]['update']['call'](this),this[_0x2383d7(0x86b)](),this[_0x2383d7(0x675)]();},Sprite_TitlePictureButton['prototype'][_0x193f56(0x2ae)]=function(){const _0x5ecdd2=_0x193f56;return VisuMZ[_0x5ecdd2(0x818)][_0x5ecdd2(0x7fe)][_0x5ecdd2(0x210)][_0x5ecdd2(0x6f1)][_0x5ecdd2(0x633)];},Sprite_TitlePictureButton['prototype'][_0x193f56(0x86b)]=function(){const _0x44888d=_0x193f56;if(this[_0x44888d(0x3f5)]||this[_0x44888d(0x4a0)]){if(_0x44888d(0x4d4)!==_0x44888d(0x4d4)){this[_0x44888d(0x566)]();const _0x2e53f2=_0x3d34af[_0x44888d(0x495)][_0x44888d(0x768)],_0x1521d8=this[_0x44888d(0x1f7)]();this[_0x44888d(0x869)]=new _0x5490b8(_0x1521d8),this[_0x44888d(0x869)][_0x44888d(0x57a)](_0x2e53f2);const _0x237903=this['commandWindowRect']();this[_0x44888d(0x869)][_0x44888d(0x33b)](_0x237903['x'],_0x237903['y'],_0x237903[_0x44888d(0x890)],_0x237903[_0x44888d(0x89f)]),this[_0x44888d(0x835)](this[_0x44888d(0x869)]);}else this[_0x44888d(0x77e)]=0xff;}else this[_0x44888d(0x77e)]+=this[_0x44888d(0x66c)]?this[_0x44888d(0x2ae)]():-0x1*this['fadeSpeed'](),this[_0x44888d(0x77e)]=Math[_0x44888d(0x222)](0xc0,this[_0x44888d(0x77e)]);},Sprite_TitlePictureButton[_0x193f56(0x415)][_0x193f56(0x422)]=function(_0x24a230){const _0x570f8e=_0x193f56;this[_0x570f8e(0x6fb)]=_0x24a230;},Sprite_TitlePictureButton['prototype'][_0x193f56(0x13c)]=function(){const _0x144f82=_0x193f56;this[_0x144f82(0x6fb)]&&this[_0x144f82(0x6fb)]();},VisuMZ[_0x193f56(0x818)]['Spriteset_Base_initialize']=Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x7c5)],Spriteset_Base['prototype'][_0x193f56(0x7c5)]=function(){const _0x4f07e9=_0x193f56;VisuMZ[_0x4f07e9(0x818)][_0x4f07e9(0x3a3)][_0x4f07e9(0x865)](this),this['initMembersCoreEngine']();},Spriteset_Base['prototype'][_0x193f56(0x8e9)]=function(){const _0x4dea56=_0x193f56;this[_0x4dea56(0x7c3)]=[],this[_0x4dea56(0x50d)]=[],this[_0x4dea56(0x1c8)]=this[_0x4dea56(0x1d8)]['x'],this[_0x4dea56(0x6a8)]=this[_0x4dea56(0x1d8)]['y'];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x720)]=Spriteset_Base[_0x193f56(0x415)]['destroy'],Spriteset_Base['prototype'][_0x193f56(0x595)]=function(_0x4939ca){const _0x5f23fb=_0x193f56;this['removeAllFauxAnimations'](),this['removeAllPointAnimations'](),VisuMZ[_0x5f23fb(0x818)][_0x5f23fb(0x720)][_0x5f23fb(0x865)](this,_0x4939ca);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x56e)]=Spriteset_Base[_0x193f56(0x415)]['update'],Spriteset_Base['prototype'][_0x193f56(0x4f0)]=function(){const _0xae0a5b=_0x193f56;VisuMZ['CoreEngine'][_0xae0a5b(0x56e)][_0xae0a5b(0x865)](this),this[_0xae0a5b(0x19d)](),this[_0xae0a5b(0x463)](),this[_0xae0a5b(0x777)]();},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x19d)]=function(){const _0x59358c=_0x193f56;if(!VisuMZ[_0x59358c(0x818)]['Settings'][_0x59358c(0x168)][_0x59358c(0x5e9)])return;if(this[_0x59358c(0x1c8)]===this[_0x59358c(0x1d8)]['x']&&this[_0x59358c(0x6a8)]===this[_0x59358c(0x1d8)]['y'])return;this[_0x59358c(0x6b0)](),this['_cacheScaleX']=this[_0x59358c(0x1d8)]['x'],this['_cacheScaleY']=this[_0x59358c(0x1d8)]['y'];},Spriteset_Base['prototype'][_0x193f56(0x6b0)]=function(){const _0x2a524e=_0x193f56;if(SceneManager[_0x2a524e(0x637)]()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle[_0x2a524e(0x2b4)])return;}this['scale']['x']!==0x0&&(this['_pictureContainer']['scale']['x']=0x1/this['scale']['x'],this[_0x2a524e(0x21f)]['x']=-(this['x']/this[_0x2a524e(0x1d8)]['x'])),this[_0x2a524e(0x1d8)]['y']!==0x0&&(this['_pictureContainer'][_0x2a524e(0x1d8)]['y']=0x1/this['scale']['y'],this['_pictureContainer']['y']=-(this['y']/this['scale']['y']));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x7ae)]=Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x2f2)],Spriteset_Base[_0x193f56(0x415)]['updatePosition']=function(){const _0x45474a=_0x193f56;VisuMZ[_0x45474a(0x818)]['Spriteset_Base_updatePosition'][_0x45474a(0x865)](this),this[_0x45474a(0x71b)]();},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x71b)]=function(){const _0x3e0e78=_0x193f56;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x3e0e78(0x44b)]($gameScreen[_0x3e0e78(0x891)]());const _0x55c73e=$gameScreen[_0x3e0e78(0x2c2)]();switch($gameScreen[_0x3e0e78(0x2c2)]()){case'original':this[_0x3e0e78(0x47d)]();break;case _0x3e0e78(0x6f8):this[_0x3e0e78(0x725)]();break;case _0x3e0e78(0x1d0):this[_0x3e0e78(0x6e8)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x47d)]=function(){const _0x1db178=_0x193f56,_0x2ebc9e=VisuMZ[_0x1db178(0x818)]['Settings'][_0x1db178(0x855)];if(_0x2ebc9e&&_0x2ebc9e[_0x1db178(0x501)])return _0x2ebc9e[_0x1db178(0x501)][_0x1db178(0x865)](this);this['x']+=Math[_0x1db178(0x44b)]($gameScreen[_0x1db178(0x891)]());},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x70b)]=function(){const _0x1db945=_0x193f56,_0x442957=VisuMZ[_0x1db945(0x818)][_0x1db945(0x7fe)]['ScreenShake'];if(_0x442957&&_0x442957[_0x1db945(0x2ad)])return _0x442957[_0x1db945(0x2ad)][_0x1db945(0x865)](this);const _0x33aef3=$gameScreen[_0x1db945(0x464)]*0.75,_0xd1c5af=$gameScreen[_0x1db945(0x873)]*0.6,_0x229849=$gameScreen[_0x1db945(0x29e)];this['x']+=Math[_0x1db945(0x44b)](Math[_0x1db945(0x528)](_0x33aef3)-Math[_0x1db945(0x528)](_0xd1c5af))*(Math[_0x1db945(0x222)](_0x229849,0x1e)*0.5),this['y']+=Math['round'](Math[_0x1db945(0x528)](_0x33aef3)-Math[_0x1db945(0x528)](_0xd1c5af))*(Math[_0x1db945(0x222)](_0x229849,0x1e)*0.5);},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x725)]=function(){const _0x3efa2b=_0x193f56,_0x239cdc=VisuMZ[_0x3efa2b(0x818)][_0x3efa2b(0x7fe)][_0x3efa2b(0x855)];if(_0x239cdc&&_0x239cdc[_0x3efa2b(0x221)])return _0x239cdc[_0x3efa2b(0x221)][_0x3efa2b(0x865)](this);const _0x2f9686=$gameScreen[_0x3efa2b(0x464)]*0.75,_0x3e77b8=$gameScreen['_shakeSpeed']*0.6,_0xf352b7=$gameScreen[_0x3efa2b(0x29e)];this['x']+=Math['round'](Math[_0x3efa2b(0x528)](_0x2f9686)-Math[_0x3efa2b(0x528)](_0x3e77b8))*(Math[_0x3efa2b(0x222)](_0xf352b7,0x1e)*0.5);},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x6e8)]=function(){const _0x1d245f=_0x193f56,_0xa365b1=VisuMZ[_0x1d245f(0x818)][_0x1d245f(0x7fe)][_0x1d245f(0x855)];if(_0xa365b1&&_0xa365b1[_0x1d245f(0x877)])return _0xa365b1[_0x1d245f(0x877)][_0x1d245f(0x865)](this);const _0x5816f8=$gameScreen['_shakePower']*0.75,_0x522dc7=$gameScreen[_0x1d245f(0x873)]*0.6,_0x20f3b1=$gameScreen[_0x1d245f(0x29e)];this['y']+=Math[_0x1d245f(0x44b)](Math['randomInt'](_0x5816f8)-Math[_0x1d245f(0x528)](_0x522dc7))*(Math[_0x1d245f(0x222)](_0x20f3b1,0x1e)*0.5);},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x463)]=function(){const _0x32053f=_0x193f56;for(const _0x5480d4 of this[_0x32053f(0x7c3)]){if(_0x32053f(0x5b3)===_0x32053f(0x231)){let _0x4870bd=_0x18831e[_0x32053f(0x818)][_0x32053f(0x27c)]['call'](this,_0x394d04);return _0x4870bd['x']=_0x1c98c5[_0x32053f(0x44b)](_0x4870bd['x']),_0x4870bd['y']=_0x8873cf['round'](_0x4870bd['y']),_0x4870bd[_0x32053f(0x890)]=_0x5f21c1[_0x32053f(0x44b)](_0x4870bd[_0x32053f(0x890)]),_0x4870bd[_0x32053f(0x89f)]=_0x3447a5[_0x32053f(0x44b)](_0x4870bd[_0x32053f(0x89f)]),_0x4870bd;}else{if(!_0x5480d4[_0x32053f(0x4e0)]()){if('pmBZD'!==_0x32053f(0x775)){const _0x293270=_0x7037bf[_0x32053f(0x772)]();this[_0x32053f(0x886)]=_0x9131a9[_0x32053f(0x528)](_0x293270)+_0x13f313[_0x32053f(0x528)](_0x293270)+this[_0x32053f(0x8bd)]();}else this[_0x32053f(0x5ab)](_0x5480d4);}}}this['processFauxAnimationRequests']();},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x7a0)]=function(){const _0x2419bd=_0x193f56;for(;;){const _0x19a492=$gameTemp[_0x2419bd(0x4fb)]();if(_0x19a492)this[_0x2419bd(0x79f)](_0x19a492);else break;}},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x79f)]=function(_0x49e86d){const _0x1a72c6=_0x193f56,_0x266c4e=$dataAnimations[_0x49e86d[_0x1a72c6(0x1db)]],_0x4d9fa4=_0x49e86d[_0x1a72c6(0x654)],_0x1d4d6a=_0x49e86d[_0x1a72c6(0x151)],_0x617b1a=_0x49e86d[_0x1a72c6(0x37a)];let _0x56b195=this[_0x1a72c6(0x614)]();const _0x25ac06=this['animationNextDelay']();if(this[_0x1a72c6(0x1ec)](_0x266c4e))for(const _0x4a2c7 of _0x4d9fa4){this['createFauxAnimationSprite']([_0x4a2c7],_0x266c4e,_0x1d4d6a,_0x56b195,_0x617b1a),_0x56b195+=_0x25ac06;}else'IHqWn'===_0x1a72c6(0x7f6)?this[_0x1a72c6(0x6b8)](_0x4d9fa4,_0x266c4e,_0x1d4d6a,_0x56b195,_0x617b1a):(_0x5e11f6[_0x1a72c6(0x418)](),this['onNameOk']());},Spriteset_Base['prototype'][_0x193f56(0x6b8)]=function(_0x1a5f61,_0x47b51b,_0x51878c,_0x4688d5,_0x33e5cc){const _0x5c556b=_0x193f56,_0x4c930b=this['isMVAnimation'](_0x47b51b),_0x10cd2b=new(_0x4c930b?Sprite_AnimationMV:Sprite_Animation)(),_0x39fd0a=this[_0x5c556b(0x5c5)](_0x1a5f61);this[_0x5c556b(0x48d)](_0x1a5f61[0x0])&&(_0x51878c=!_0x51878c),_0x10cd2b['targetObjects']=_0x1a5f61,_0x10cd2b[_0x5c556b(0x8df)](_0x39fd0a,_0x47b51b,_0x51878c,_0x4688d5),_0x10cd2b[_0x5c556b(0x4bf)](_0x33e5cc),this['_effectsContainer']['addChild'](_0x10cd2b),this[_0x5c556b(0x7c3)][_0x5c556b(0x8a7)](_0x10cd2b);},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x5ab)]=function(_0x3ee19f){const _0x1b45a4=_0x193f56;this[_0x1b45a4(0x7c3)][_0x1b45a4(0x195)](_0x3ee19f),this[_0x1b45a4(0x6d4)]['removeChild'](_0x3ee19f);for(const _0x2ab93f of _0x3ee19f['targetObjects']){if(_0x1b45a4(0x74c)!==_0x1b45a4(0x8ab)){if(_0x2ab93f[_0x1b45a4(0x630)]){if(_0x1b45a4(0x82a)===_0x1b45a4(0x3f9))return _0x504e15[_0x1b45a4(0x818)]['Settings'][_0x1b45a4(0x168)]['AccuracyBoost']&&this[_0x1b45a4(0x4ec)]()[_0x1b45a4(0x17f)]()?this[_0x1b45a4(0x4ec)]()['hit']+0.05:this['subject']()[_0x1b45a4(0x16e)];else _0x2ab93f[_0x1b45a4(0x630)]();}}else _0x890413+=_0x170f26,_0x392dc9+='%1〘Choice\x20Cancel〙%1'[_0x1b45a4(0x627)](_0x2a79c3);}_0x3ee19f['destroy']();},Spriteset_Base['prototype'][_0x193f56(0x74a)]=function(){const _0x2ae286=_0x193f56;for(const _0x922259 of this[_0x2ae286(0x7c3)]){this[_0x2ae286(0x5ab)](_0x922259);}},Spriteset_Base[_0x193f56(0x415)]['isFauxAnimationPlaying']=function(){const _0x3619c9=_0x193f56;return this[_0x3619c9(0x7c3)][_0x3619c9(0x8f1)]>0x0;},Spriteset_Base['prototype']['updatePointAnimations']=function(){const _0x507748=_0x193f56;for(const _0x174763 of this[_0x507748(0x50d)]){if(!_0x174763['isPlaying']()){if(_0x507748(0x48b)!==_0x507748(0x64c))this[_0x507748(0x750)](_0x174763);else{const _0x59089f=_0x93b619(this[_0x507748(0x1a6)]['name']),_0x57d137=this[_0x507748(0x46d)](_0x59089f);return _0x57d137?_0x57d137[_0x507748(0x292)]:0xc0;}}}this[_0x507748(0x127)]();},Spriteset_Base['prototype'][_0x193f56(0x127)]=function(){const _0x263b95=_0x193f56;for(;;){if('mJNoe'!==_0x263b95(0x709))_0x43b111['CoreEngine']['Settings']['UI']['RepositionActors']?this[_0x263b95(0x87e)](_0x55f497):_0x5dfe69[_0x263b95(0x818)][_0x263b95(0x885)][_0x263b95(0x865)](this,_0x1cd3e0);else{const _0x2fd402=$gameTemp[_0x263b95(0x15c)]();if(_0x2fd402)this[_0x263b95(0x4cc)](_0x2fd402);else{if('MHHdI'!=='MHHdI'){const _0x319492=_0x54df5e[_0x263b95(0x636)];let _0x4eace1=_0x208daa[_0x263b95(0x3ab)];if(['',_0x263b95(0x71f)]['includes'](_0x4eace1))_0x4eace1=_0x2a7e69[_0x263b95(0x6d6)]['call'](this);const _0x18f8f8=_0x5d1469[_0x263b95(0x8f6)]['call'](this),_0x776bf0=_0x2925f8[_0x263b95(0x307)][_0x263b95(0x865)](this);this[_0x263b95(0x7a4)](_0x4eace1,_0x319492,_0x18f8f8,_0x776bf0),this[_0x263b95(0x14f)](_0x319492,_0x2894b6[_0x263b95(0x880)][_0x263b95(0x65c)](this,_0x776bf0));}else break;}}}},Spriteset_Base[_0x193f56(0x415)]['createPointAnimation']=function(_0x482101){const _0x156dc5=_0x193f56,_0x520732=$dataAnimations[_0x482101[_0x156dc5(0x1db)]],_0x271495=this['createPointAnimationTargets'](_0x482101),_0x465afe=_0x482101['mirror'],_0x219a90=_0x482101[_0x156dc5(0x37a)];let _0x1a9d01=this[_0x156dc5(0x614)]();const _0x5c53fc=this[_0x156dc5(0x1da)]();if(this['isAnimationForEach'](_0x520732))for(const _0x2d5c9f of _0x271495){this[_0x156dc5(0x704)]([_0x2d5c9f],_0x520732,_0x465afe,_0x1a9d01,_0x219a90),_0x1a9d01+=_0x5c53fc;}else this[_0x156dc5(0x704)](_0x271495,_0x520732,_0x465afe,_0x1a9d01,_0x219a90);},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x643)]=function(_0x434dd7){const _0x7fdd39=_0x193f56,_0x130f88=new Sprite_Clickable();_0x130f88['x']=_0x434dd7['x'],_0x130f88['y']=_0x434dd7['y'],_0x130f88['z']=0x64;const _0x103fb8=this[_0x7fdd39(0x23b)]();return _0x103fb8[_0x7fdd39(0x6a3)](_0x130f88),[_0x130f88];},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x23b)]=function(){return this;},Spriteset_Map[_0x193f56(0x415)][_0x193f56(0x23b)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x193f56(0x415)][_0x193f56(0x23b)]=function(){const _0x36fe1e=_0x193f56;return this[_0x36fe1e(0x252)]||this;},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x704)]=function(_0x4b6f1b,_0x503004,_0x3532f4,_0x5118d0,_0x93f09d){const _0x3eb70e=_0x193f56,_0xcea437=this[_0x3eb70e(0x8e8)](_0x503004),_0x12ec8b=new(_0xcea437?Sprite_AnimationMV:Sprite_Animation)();_0x12ec8b[_0x3eb70e(0x491)]=_0x4b6f1b,_0x12ec8b[_0x3eb70e(0x8df)](_0x4b6f1b,_0x503004,_0x3532f4,_0x5118d0),_0x12ec8b[_0x3eb70e(0x4bf)](_0x93f09d),this[_0x3eb70e(0x6d4)][_0x3eb70e(0x6a3)](_0x12ec8b),this[_0x3eb70e(0x50d)][_0x3eb70e(0x8a7)](_0x12ec8b);},Spriteset_Base[_0x193f56(0x415)]['removePointAnimation']=function(_0x4be205){const _0x2381b6=_0x193f56;this[_0x2381b6(0x50d)]['remove'](_0x4be205),this['_effectsContainer'][_0x2381b6(0x52b)](_0x4be205);for(const _0x5246d5 of _0x4be205['targetObjects']){if(_0x2381b6(0x400)!==_0x2381b6(0x367)){_0x5246d5[_0x2381b6(0x630)]&&_0x5246d5[_0x2381b6(0x630)]();const _0x495dc0=this[_0x2381b6(0x23b)]();if(_0x495dc0)_0x495dc0[_0x2381b6(0x52b)](_0x5246d5);}else{if(this[_0x2381b6(0x3a4)]===_0x1494d0)this['initCoreEngine']();if(this[_0x2381b6(0x3a4)][_0x2381b6(0x81f)]===_0x176949)this[_0x2381b6(0x466)]();this['_CoreEngineSettings']['SideView']=_0x325e4e;}}_0x4be205['destroy']();},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x2bd)]=function(){const _0x47b940=_0x193f56;for(const _0x4317ad of this['_pointAnimationSprites']){this[_0x47b940(0x750)](_0x4317ad);}},Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x676)]=function(){const _0x471063=_0x193f56;return this[_0x471063(0x50d)][_0x471063(0x8f1)]>0x0;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x174)]=Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x735)],Spriteset_Base[_0x193f56(0x415)][_0x193f56(0x735)]=function(){const _0x403a93=_0x193f56;return VisuMZ[_0x403a93(0x818)][_0x403a93(0x174)]['call'](this)||this[_0x403a93(0x676)]();},Spriteset_Map[_0x193f56(0x2b4)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x168)][_0x193f56(0x73d)]||![],VisuMZ[_0x193f56(0x818)][_0x193f56(0x3a2)]=Scene_Map[_0x193f56(0x415)][_0x193f56(0x4b6)],Scene_Map[_0x193f56(0x415)][_0x193f56(0x4b6)]=function(){const _0x1f8161=_0x193f56;VisuMZ[_0x1f8161(0x818)][_0x1f8161(0x3a2)]['call'](this);if(!Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;const _0x57e65a=this[_0x1f8161(0x3f1)];if(!_0x57e65a)return;this[_0x1f8161(0x21f)]=_0x57e65a[_0x1f8161(0x21f)];if(!this['_pictureContainer'])return;this[_0x1f8161(0x6a3)](this[_0x1f8161(0x21f)]);},Spriteset_Battle[_0x193f56(0x2b4)]=VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x168)][_0x193f56(0x285)]||![],VisuMZ['CoreEngine'][_0x193f56(0x8e7)]=Scene_Battle[_0x193f56(0x415)][_0x193f56(0x4b6)],Scene_Battle['prototype'][_0x193f56(0x4b6)]=function(){const _0x201537=_0x193f56;VisuMZ[_0x201537(0x818)]['Scene_Battle_createSpriteset_detach'][_0x201537(0x865)](this);if(!Spriteset_Battle[_0x201537(0x2b4)])return;const _0x595633=this[_0x201537(0x3f1)];if(!_0x595633)return;this[_0x201537(0x21f)]=_0x595633[_0x201537(0x21f)];if(!this[_0x201537(0x21f)])return;this[_0x201537(0x6a3)](this[_0x201537(0x21f)]);},Spriteset_Battle[_0x193f56(0x415)][_0x193f56(0x212)]=function(){const _0x5a3dbb=_0x193f56;this[_0x5a3dbb(0x514)]=new PIXI['filters'][(_0x5a3dbb(0x50e))](clamp=!![]),this[_0x5a3dbb(0x4bb)]=new Sprite(),this[_0x5a3dbb(0x4bb)][_0x5a3dbb(0x481)]=SceneManager['backgroundBitmap'](),this[_0x5a3dbb(0x4bb)][_0x5a3dbb(0x4fe)]=[this[_0x5a3dbb(0x514)]],this[_0x5a3dbb(0x1be)][_0x5a3dbb(0x6a3)](this[_0x5a3dbb(0x4bb)]);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x4ad)]=Spriteset_Battle['prototype']['createEnemies'],Spriteset_Battle[_0x193f56(0x415)][_0x193f56(0x546)]=function(){const _0x3bbaba=_0x193f56;this[_0x3bbaba(0x713)]()&&this[_0x3bbaba(0x6db)](),VisuMZ[_0x3bbaba(0x818)]['Spriteset_Battle_createEnemies'][_0x3bbaba(0x865)](this);},Spriteset_Battle[_0x193f56(0x415)][_0x193f56(0x713)]=function(){const _0xfa7459=_0x193f56,_0x56836b=VisuMZ[_0xfa7459(0x818)][_0xfa7459(0x7fe)][_0xfa7459(0x762)];if(!_0x56836b)return![];if(Utils[_0xfa7459(0x15d)]>='1.3.0'&&!_0x56836b[_0xfa7459(0x1e2)])return![];return _0x56836b[_0xfa7459(0x58d)];},Spriteset_Battle[_0x193f56(0x415)][_0x193f56(0x6db)]=function(){for(member of $gameTroop['members']()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x193f56(0x415)][_0x193f56(0x7c5)],Window_Base[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(_0x3642d6){const _0x59a875=_0x193f56;_0x3642d6['x']=Math[_0x59a875(0x44b)](_0x3642d6['x']),_0x3642d6['y']=Math[_0x59a875(0x44b)](_0x3642d6['y']),_0x3642d6[_0x59a875(0x890)]=Math[_0x59a875(0x44b)](_0x3642d6[_0x59a875(0x890)]),_0x3642d6[_0x59a875(0x89f)]=Math[_0x59a875(0x44b)](_0x3642d6[_0x59a875(0x89f)]),this[_0x59a875(0x4b5)](),VisuMZ['CoreEngine'][_0x59a875(0x6ce)]['call'](this,_0x3642d6),this['initCoreEasing']();},Window_Base[_0x193f56(0x415)][_0x193f56(0x4b5)]=function(){const _0x2deee6=_0x193f56;this[_0x2deee6(0x248)]=VisuMZ[_0x2deee6(0x818)][_0x2deee6(0x7fe)][_0x2deee6(0x168)][_0x2deee6(0x383)],this[_0x2deee6(0x726)]=VisuMZ[_0x2deee6(0x818)][_0x2deee6(0x7fe)][_0x2deee6(0x168)]['DigitGroupingExText'];},Window_Base['prototype'][_0x193f56(0x7a2)]=function(){const _0x24d1b2=_0x193f56;return VisuMZ['CoreEngine'][_0x24d1b2(0x7fe)]['Window'][_0x24d1b2(0x5f9)];},Window_Base[_0x193f56(0x415)][_0x193f56(0x414)]=function(){const _0x4fb3d4=_0x193f56;return VisuMZ[_0x4fb3d4(0x818)][_0x4fb3d4(0x7fe)][_0x4fb3d4(0x899)][_0x4fb3d4(0x4d3)];},Window_Base[_0x193f56(0x415)][_0x193f56(0x479)]=function(){const _0x5319bf=_0x193f56;if($gameSystem[_0x5319bf(0x8f0)])_0x5319bf(0x40c)===_0x5319bf(0x40c)?this['backOpacity']=$gameSystem['windowOpacity']():(_0x4c6cfc[_0x5319bf(0x818)][_0x5319bf(0x31a)][_0x5319bf(0x865)](this),this['setCoreEngineUpdateWindowBg']());else{if(_0x5319bf(0x402)===_0x5319bf(0x26e))var _0x49b2c1=_0x3f3429['ApplyEasing'](_0x3486da*0x2,_0x5319bf(0x7af))*0.5;else this['backOpacity']=VisuMZ[_0x5319bf(0x818)][_0x5319bf(0x7fe)][_0x5319bf(0x899)][_0x5319bf(0x332)];}},Window_Base['prototype'][_0x193f56(0x4d2)]=function(){const _0x4ed0ab=_0x193f56;return VisuMZ[_0x4ed0ab(0x818)][_0x4ed0ab(0x7fe)][_0x4ed0ab(0x899)][_0x4ed0ab(0x1b8)];},Window_Base[_0x193f56(0x415)]['openingSpeed']=function(){const _0x1618ca=_0x193f56;return VisuMZ[_0x1618ca(0x818)][_0x1618ca(0x7fe)][_0x1618ca(0x899)][_0x1618ca(0x1ab)];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x10d)]=Window_Base[_0x193f56(0x415)]['update'],Window_Base['prototype'][_0x193f56(0x4f0)]=function(){const _0x3444b3=_0x193f56;VisuMZ[_0x3444b3(0x818)][_0x3444b3(0x10d)][_0x3444b3(0x865)](this),this['updateCoreEasing']();},Window_Base[_0x193f56(0x415)][_0x193f56(0x89a)]=function(){const _0x133436=_0x193f56;this[_0x133436(0x461)]&&(_0x133436(0x1c4)!=='AzotI'?(_0x37dd8a=_0x44372c||_0xd37ab[_0x133436(0x281)],_0x3cc0a2=_0xabc15d||_0x562c99['faceHeight'],_0x179b99=_0x3cf0a9[_0x133436(0x44b)](_0x670777),_0x4ffc2a=_0xa3213a[_0x133436(0x44b)](_0x551ea0),_0x55320d=_0x979c74['round'](_0x32b54c),_0x2d761b=_0x42318f[_0x133436(0x44b)](_0x343310),_0x336f68[_0x133436(0x818)]['Window_Base_drawFace']['call'](this,_0x233dfe,_0x4a7b02,_0xaf2ff4,_0x4c3f57,_0x234d4e,_0x61a96f)):(this[_0x133436(0x826)]+=this['openingSpeed'](),this[_0x133436(0x2c1)]()&&(this['_opening']=![])));},Window_Base[_0x193f56(0x415)][_0x193f56(0x611)]=function(){const _0x437daf=_0x193f56;this[_0x437daf(0x443)]&&(_0x437daf(0x18c)!=='ycAwV'?(_0x32a857[_0x437daf(0x22b)](_0x10c9e5[_0x437daf(0x678)],0x0,~0x0),_0x4fabe2['stencilOp'](_0x319a8d['KEEP'],_0x3e3801[_0x437daf(0x89d)],_0x17a7df[_0x437daf(0x89d)]),_0x474cbb[_0x437daf(0x44d)](_0x54c290),_0x1abe2f[_0x437daf(0x41b)][_0x437daf(0x59c)](),_0x10759f['clear'](),_0x3e0855[_0x437daf(0x22b)](_0x2c7cc7[_0x437daf(0x431)],0x1,~0x0),_0x31ab23[_0x437daf(0x5fc)](_0xfeb143[_0x437daf(0x480)],_0x315cfb[_0x437daf(0x480)],_0x139d37[_0x437daf(0x480)]),_0xd8b45b['blendFunc'](_0x2fd770[_0x437daf(0x405)],_0xc640d4[_0x437daf(0x3f4)]),_0x1b37ae['render'](_0x201046),_0x52fc2d[_0x437daf(0x41b)][_0x437daf(0x59c)](),_0x42c524[_0x437daf(0x698)](_0x580f93[_0x437daf(0x3f4)],_0x1f6a02[_0x437daf(0x4e4)])):(this[_0x437daf(0x826)]-=this[_0x437daf(0x68d)](),this['isClosed']()&&(this[_0x437daf(0x443)]=![])));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x1c0)]=Window_Base['prototype'][_0x193f56(0x84f)],Window_Base[_0x193f56(0x415)]['drawText']=function(_0x3328d7,_0x300ec2,_0x357dbd,_0x118ac7,_0x41c989){const _0x3eeee2=_0x193f56;if(this[_0x3eeee2(0x7e4)]())_0x3328d7=VisuMZ[_0x3eeee2(0x164)](_0x3328d7);VisuMZ[_0x3eeee2(0x818)][_0x3eeee2(0x1c0)][_0x3eeee2(0x865)](this,_0x3328d7,_0x300ec2,_0x357dbd,_0x118ac7,_0x41c989);},Window_Base[_0x193f56(0x415)]['useDigitGrouping']=function(){return this['_digitGrouping'];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x103)]=Window_Base[_0x193f56(0x415)][_0x193f56(0x4f8)],Window_Base[_0x193f56(0x415)]['createTextState']=function(_0x344a8d,_0x33807a,_0x1ee1ac,_0x32d204){const _0x3d9a6b=_0x193f56;var _0x2a91e3=VisuMZ[_0x3d9a6b(0x818)]['Window_Base_createTextState'][_0x3d9a6b(0x865)](this,_0x344a8d,_0x33807a,_0x1ee1ac,_0x32d204);if(this[_0x3d9a6b(0x6d8)]())_0x2a91e3[_0x3d9a6b(0x2e2)]=VisuMZ[_0x3d9a6b(0x164)](_0x2a91e3[_0x3d9a6b(0x2e2)]);return _0x2a91e3;},Window_Base[_0x193f56(0x415)][_0x193f56(0x6d8)]=function(){return this['_digitGroupingEx'];},Window_Base['prototype'][_0x193f56(0x524)]=function(_0x266811){const _0x316647=_0x193f56;this[_0x316647(0x248)]=_0x266811;},Window_Base['prototype'][_0x193f56(0x579)]=function(_0x83c6bf){const _0x342702=_0x193f56;this[_0x342702(0x726)]=_0x83c6bf;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x73f)]=Window_Base[_0x193f56(0x415)][_0x193f56(0x3fe)],Window_Base[_0x193f56(0x415)]['drawIcon']=function(_0x231841,_0x50679c,_0x1abffd){const _0x1c843c=_0x193f56;_0x50679c=Math[_0x1c843c(0x44b)](_0x50679c),_0x1abffd=Math[_0x1c843c(0x44b)](_0x1abffd),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0x1c843c(0x865)](this,_0x231841,_0x50679c,_0x1abffd);},VisuMZ[_0x193f56(0x818)]['Window_Base_drawFace']=Window_Base[_0x193f56(0x415)][_0x193f56(0x594)],Window_Base[_0x193f56(0x415)][_0x193f56(0x594)]=function(_0x370c8b,_0xf4034d,_0x44527c,_0x3c57f5,_0x1c4bda,_0x104a80){const _0x2ccf1c=_0x193f56;_0x1c4bda=_0x1c4bda||ImageManager[_0x2ccf1c(0x281)],_0x104a80=_0x104a80||ImageManager['faceHeight'],_0x44527c=Math[_0x2ccf1c(0x44b)](_0x44527c),_0x3c57f5=Math['round'](_0x3c57f5),_0x1c4bda=Math['round'](_0x1c4bda),_0x104a80=Math[_0x2ccf1c(0x44b)](_0x104a80),VisuMZ['CoreEngine']['Window_Base_drawFace'][_0x2ccf1c(0x865)](this,_0x370c8b,_0xf4034d,_0x44527c,_0x3c57f5,_0x1c4bda,_0x104a80);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x825)]=Window_Base['prototype'][_0x193f56(0x832)],Window_Base[_0x193f56(0x415)][_0x193f56(0x832)]=function(_0x427634,_0x31fce9,_0x38497a,_0x120e7d){const _0x15dd59=_0x193f56;_0x38497a=Math[_0x15dd59(0x44b)](_0x38497a),_0x120e7d=Math[_0x15dd59(0x44b)](_0x120e7d),VisuMZ[_0x15dd59(0x818)][_0x15dd59(0x825)][_0x15dd59(0x865)](this,_0x427634,_0x31fce9,_0x38497a,_0x120e7d);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x27c)]=Window_Selectable[_0x193f56(0x415)][_0x193f56(0x5bf)],Window_Selectable['prototype'][_0x193f56(0x5bf)]=function(_0x437ac3){const _0x269ba7=_0x193f56;let _0x114702=VisuMZ[_0x269ba7(0x818)][_0x269ba7(0x27c)]['call'](this,_0x437ac3);return _0x114702['x']=Math['round'](_0x114702['x']),_0x114702['y']=Math[_0x269ba7(0x44b)](_0x114702['y']),_0x114702['width']=Math[_0x269ba7(0x44b)](_0x114702[_0x269ba7(0x890)]),_0x114702[_0x269ba7(0x89f)]=Math['round'](_0x114702[_0x269ba7(0x89f)]),_0x114702;},VisuMZ[_0x193f56(0x818)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase['prototype']['drawActorSimpleStatus'],Window_StatusBase[_0x193f56(0x415)][_0x193f56(0x38f)]=function(_0x3e0180,_0x4ce974,_0x2e6840){const _0x40034b=_0x193f56;_0x4ce974=Math['round'](_0x4ce974),_0x2e6840=Math[_0x40034b(0x44b)](_0x2e6840),VisuMZ[_0x40034b(0x818)][_0x40034b(0x70f)]['call'](this,_0x3e0180,_0x4ce974,_0x2e6840);},Window_Base['prototype']['initCoreEasing']=function(){const _0x47a695=_0x193f56;this[_0x47a695(0x4ff)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x47a695(0x1d8)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x47a695(0x77e)],'targetBackOpacity':this[_0x47a695(0x4dc)],'targetContentsOpacity':this[_0x47a695(0x334)]};},Window_Base['prototype'][_0x193f56(0x622)]=function(){const _0x4bb25b=_0x193f56;if(!this['_coreEasing'])return;if(this[_0x4bb25b(0x4ff)][_0x4bb25b(0x55f)]<=0x0)return;this['x']=this[_0x4bb25b(0x665)](this['x'],this[_0x4bb25b(0x4ff)][_0x4bb25b(0x44e)]),this['y']=this[_0x4bb25b(0x665)](this['y'],this[_0x4bb25b(0x4ff)][_0x4bb25b(0x807)]),this[_0x4bb25b(0x1d8)]['x']=this['applyCoreEasing'](this['scale']['x'],this['_coreEasing'][_0x4bb25b(0x5d2)]),this[_0x4bb25b(0x1d8)]['y']=this[_0x4bb25b(0x665)](this[_0x4bb25b(0x1d8)]['y'],this[_0x4bb25b(0x4ff)][_0x4bb25b(0x293)]),this[_0x4bb25b(0x77e)]=this['applyCoreEasing'](this['opacity'],this[_0x4bb25b(0x4ff)][_0x4bb25b(0x1d6)]),this['backOpacity']=this[_0x4bb25b(0x665)](this['backOpacity'],this[_0x4bb25b(0x4ff)][_0x4bb25b(0x792)]),this[_0x4bb25b(0x334)]=this[_0x4bb25b(0x665)](this[_0x4bb25b(0x334)],this[_0x4bb25b(0x4ff)][_0x4bb25b(0x747)]),this['_coreEasing']['duration']--;},Window_Base[_0x193f56(0x415)][_0x193f56(0x665)]=function(_0x5d4d4a,_0x5e2147){const _0xaed4d5=_0x193f56;if(!this['_coreEasing'])return _0x5e2147;const _0x1e30a8=this[_0xaed4d5(0x4ff)][_0xaed4d5(0x55f)],_0x11f5e6=this[_0xaed4d5(0x4ff)][_0xaed4d5(0x7f7)],_0x5d32e1=this[_0xaed4d5(0x3b3)]((_0x11f5e6-_0x1e30a8)/_0x11f5e6),_0x1c31a0=this[_0xaed4d5(0x3b3)]((_0x11f5e6-_0x1e30a8+0x1)/_0x11f5e6),_0x1f01eb=(_0x5d4d4a-_0x5e2147*_0x5d32e1)/(0x1-_0x5d32e1);return _0x1f01eb+(_0x5e2147-_0x1f01eb)*_0x1c31a0;},Window_Base[_0x193f56(0x415)]['calcCoreEasing']=function(_0x1ec26a){const _0x2d2526=_0x193f56;if(!this[_0x2d2526(0x4ff)])return _0x1ec26a;return VisuMZ[_0x2d2526(0x737)](_0x1ec26a,this['_coreEasing']['type']||'LINEAR');},Window_Base['prototype'][_0x193f56(0x647)]=function(_0x420385,_0x4ee52e){const _0x17cd53=_0x193f56;if(!this[_0x17cd53(0x4ff)])return;this['x']=this[_0x17cd53(0x4ff)][_0x17cd53(0x44e)],this['y']=this[_0x17cd53(0x4ff)]['targetY'],this[_0x17cd53(0x1d8)]['x']=this[_0x17cd53(0x4ff)][_0x17cd53(0x5d2)],this['scale']['y']=this[_0x17cd53(0x4ff)]['targetScaleY'],this['opacity']=this[_0x17cd53(0x4ff)][_0x17cd53(0x1d6)],this[_0x17cd53(0x4dc)]=this[_0x17cd53(0x4ff)][_0x17cd53(0x792)],this[_0x17cd53(0x334)]=this[_0x17cd53(0x4ff)][_0x17cd53(0x747)],this[_0x17cd53(0x671)](_0x420385,_0x4ee52e,this['x'],this['y'],this['scale']['x'],this['scale']['y'],this['opacity'],this['backOpacity'],this[_0x17cd53(0x334)]);},Window_Base['prototype'][_0x193f56(0x671)]=function(_0x113d18,_0x2d7742,_0x26d525,_0x371b42,_0x21eb3b,_0x422f1d,_0x5b007a,_0x298f11,_0x4e32b){const _0xe1f8e5=_0x193f56;this[_0xe1f8e5(0x4ff)]={'duration':_0x113d18,'wholeDuration':_0x113d18,'type':_0x2d7742,'targetX':_0x26d525,'targetY':_0x371b42,'targetScaleX':_0x21eb3b,'targetScaleY':_0x422f1d,'targetOpacity':_0x5b007a,'targetBackOpacity':_0x298f11,'targetContentsOpacity':_0x4e32b};},Window_Base[_0x193f56(0x415)][_0x193f56(0x56b)]=function(_0x21909a,_0xafd27f,_0x809102,_0x34f63a,_0x4909ac){const _0x44a3c1=_0x193f56;this[_0x44a3c1(0x43d)](),this[_0x44a3c1(0x1e0)][_0x44a3c1(0x5dd)]=VisuMZ['CoreEngine']['Settings'][_0x44a3c1(0x132)]['GoldFontSize'];const _0x5dacad=VisuMZ['CoreEngine'][_0x44a3c1(0x7fe)][_0x44a3c1(0x132)][_0x44a3c1(0x7b9)];if(_0x5dacad>0x0&&_0xafd27f===TextManager['currencyUnit']){const _0x253260=_0x34f63a+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x44a3c1(0x3fe)](_0x5dacad,_0x809102+(_0x4909ac-ImageManager[_0x44a3c1(0x776)]),_0x253260),_0x4909ac-=ImageManager[_0x44a3c1(0x776)]+0x4;}else this['changeTextColor'](ColorManager[_0x44a3c1(0x4bd)]()),this[_0x44a3c1(0x84f)](_0xafd27f,_0x809102,_0x34f63a,_0x4909ac,_0x44a3c1(0x5cf)),_0x4909ac-=this['textWidth'](_0xafd27f)+0x6;this[_0x44a3c1(0x33e)]();const _0x1d7177=this[_0x44a3c1(0x2c3)](this[_0x44a3c1(0x248)]?VisuMZ[_0x44a3c1(0x164)](_0x21909a):_0x21909a);_0x1d7177>_0x4909ac?this[_0x44a3c1(0x84f)](VisuMZ[_0x44a3c1(0x818)]['Settings'][_0x44a3c1(0x132)][_0x44a3c1(0x115)],_0x809102,_0x34f63a,_0x4909ac,_0x44a3c1(0x5cf)):this[_0x44a3c1(0x84f)](_0x21909a,_0x809102,_0x34f63a,_0x4909ac,_0x44a3c1(0x5cf)),this[_0x44a3c1(0x43d)]();},Window_Base[_0x193f56(0x415)][_0x193f56(0x176)]=function(_0xb1ccf,_0xecb605,_0x2a55e8,_0x5b78c1,_0x49e9e2){const _0x1b1266=_0x193f56,_0x246cd4=ImageManager['loadSystem']('IconSet'),_0x55f970=ImageManager[_0x1b1266(0x776)],_0x249237=ImageManager[_0x1b1266(0x8de)],_0x316d2b=_0xb1ccf%0x10*_0x55f970,_0x2d1dac=Math['floor'](_0xb1ccf/0x10)*_0x249237,_0x137aa1=_0x5b78c1,_0xc9eb68=_0x5b78c1;this[_0x1b1266(0x1e0)][_0x1b1266(0x8c4)]['imageSmoothingEnabled']=_0x49e9e2,this[_0x1b1266(0x1e0)][_0x1b1266(0x254)](_0x246cd4,_0x316d2b,_0x2d1dac,_0x55f970,_0x249237,_0xecb605,_0x2a55e8,_0x137aa1,_0xc9eb68),this[_0x1b1266(0x1e0)][_0x1b1266(0x8c4)][_0x1b1266(0x302)]=!![];},Window_Base['prototype'][_0x193f56(0x7ed)]=function(_0x5c2bed,_0x56f50b,_0xdb5b05,_0xfc1eaf,_0x4cd657,_0x11b530){const _0x5aeae5=_0x193f56,_0x5440c6=Math[_0x5aeae5(0x66d)]((_0xdb5b05-0x2)*_0xfc1eaf),_0x2abb1e=Sprite_Gauge[_0x5aeae5(0x415)][_0x5aeae5(0x3dc)][_0x5aeae5(0x865)](this),_0x38de92=_0x56f50b+this[_0x5aeae5(0x7a2)]()-_0x2abb1e-0x2;this[_0x5aeae5(0x1e0)][_0x5aeae5(0x517)](_0x5c2bed,_0x38de92,_0xdb5b05,_0x2abb1e,ColorManager[_0x5aeae5(0x62e)]()),this[_0x5aeae5(0x1e0)]['gradientFillRect'](_0x5c2bed+0x1,_0x38de92+0x1,_0x5440c6,_0x2abb1e-0x2,_0x4cd657,_0x11b530);},Window_Selectable[_0x193f56(0x415)]['cursorDown']=function(_0x236c32){const _0x26d592=_0x193f56;let _0x401a36=this[_0x26d592(0x791)]();const _0x382742=this['maxItems'](),_0x477380=this[_0x26d592(0x550)]();if(this[_0x26d592(0x544)]()&&(_0x401a36<_0x382742||_0x236c32&&_0x477380===0x1)){_0x401a36+=_0x477380;if(_0x401a36>=_0x382742)_0x401a36=_0x382742-0x1;this[_0x26d592(0x13d)](_0x401a36);}else!this['isUseModernControls']()&&('ABvIY'!==_0x26d592(0x260)?(_0x401a36<_0x382742-_0x477380||_0x236c32&&_0x477380===0x1)&&this[_0x26d592(0x13d)]((_0x401a36+_0x477380)%_0x382742):(this[_0x26d592(0x54f)]['OnLoadJS'][_0x26d592(0x865)](this),this['_data'][_0x26d592(0x604)][_0x26d592(0x865)](this),this[_0x26d592(0x422)](this[_0x26d592(0x54f)]['CallHandlerJS'][_0x26d592(0x65c)](this))));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x59b)]=Window_Selectable[_0x193f56(0x415)][_0x193f56(0x102)],Window_Selectable['prototype'][_0x193f56(0x102)]=function(_0x3005ef){const _0x16840b=_0x193f56;this[_0x16840b(0x544)]()&&_0x3005ef&&this[_0x16840b(0x550)]()===0x1&&this[_0x16840b(0x791)]()===this['maxItems']()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x16840b(0x818)][_0x16840b(0x59b)][_0x16840b(0x865)](this,_0x3005ef);},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x5c1)]=function(_0x2bc270){const _0x31e492=_0x193f56;let _0x1207d8=Math[_0x31e492(0x347)](0x0,this[_0x31e492(0x791)]());const _0x419b70=this[_0x31e492(0x180)](),_0x42a394=this['maxCols']();if(this['isUseModernControls']()&&_0x1207d8>0x0||_0x2bc270&&_0x42a394===0x1){_0x1207d8-=_0x42a394;if(_0x1207d8<=0x0)_0x1207d8=0x0;this[_0x31e492(0x13d)](_0x1207d8);}else!this[_0x31e492(0x544)]()&&((_0x1207d8>=_0x42a394||_0x2bc270&&_0x42a394===0x1)&&this['smoothSelect']((_0x1207d8-_0x42a394+_0x419b70)%_0x419b70));},VisuMZ['CoreEngine'][_0x193f56(0x149)]=Window_Selectable['prototype'][_0x193f56(0x5c1)],Window_Selectable[_0x193f56(0x415)][_0x193f56(0x5c1)]=function(_0x246bae){const _0x261202=_0x193f56;this[_0x261202(0x544)]()&&_0x246bae&&this['maxCols']()===0x1&&this[_0x261202(0x791)]()===0x0?this[_0x261202(0x13d)](this[_0x261202(0x180)]()-0x1):_0x261202(0x844)===_0x261202(0x844)?VisuMZ['CoreEngine'][_0x261202(0x149)][_0x261202(0x865)](this,_0x246bae):(this['_playtestF7Looping']=!![],this[_0x261202(0x4f0)](),_0x475647['updateEffekseer'](),this[_0x261202(0x39e)]=![]);},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x544)]=function(){const _0x19463a=_0x193f56;return VisuMZ[_0x19463a(0x818)][_0x19463a(0x7fe)][_0x19463a(0x168)][_0x19463a(0x3a6)];},VisuMZ['CoreEngine']['Window_Selectable_processCursorMove']=Window_Selectable[_0x193f56(0x415)]['processCursorMove'],Window_Selectable[_0x193f56(0x415)][_0x193f56(0x23a)]=function(){const _0x5bb73b=_0x193f56;this[_0x5bb73b(0x544)]()?(this[_0x5bb73b(0x6ed)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x5bb73b(0x818)][_0x5bb73b(0x733)][_0x5bb73b(0x865)](this);},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x74e)]=function(){return!![];},Window_Selectable[_0x193f56(0x415)]['processCursorMoveModernControls']=function(){const _0x4480ff=_0x193f56;if(this['isCursorMovable']()){const _0x60a3a2=this[_0x4480ff(0x791)]();Input[_0x4480ff(0x215)](_0x4480ff(0x1b0))&&(_0x4480ff(0x661)!==_0x4480ff(0x774)?Input['isPressed']('shift')&&this[_0x4480ff(0x74e)]()?this[_0x4480ff(0x28c)]():this[_0x4480ff(0x102)](Input['isTriggered']('down')):this[_0x4480ff(0x1ff)]());Input[_0x4480ff(0x215)]('up')&&('RtlQu'===_0x4480ff(0x62c)?(_0x702729=_0x124463[_0x4480ff(0x44b)](_0x319cfe),_0x1bedf1=_0xcc5435[_0x4480ff(0x44b)](_0x4f516d),_0x1d5108[_0x4480ff(0x818)]['Window_StatusBase_drawActorSimpleStatus'][_0x4480ff(0x865)](this,_0x418944,_0x20f318,_0xe0c106)):Input[_0x4480ff(0x53a)](_0x4480ff(0x73a))&&this[_0x4480ff(0x74e)]()?this[_0x4480ff(0x1b4)]():_0x4480ff(0x55a)==='Dweut'?this[_0x4480ff(0x5c1)](Input[_0x4480ff(0x7f1)]('up')):_0xc2c54=_0x23b81c[_0x4480ff(0x75c)](_0x2ca795));Input['isRepeated'](_0x4480ff(0x5cf))&&(_0x4480ff(0x206)!==_0x4480ff(0x206)?_0x15d6d0[_0x4480ff(0x818)][_0x4480ff(0x8b6)][_0x4480ff(0x865)](this,_0x17231b):this[_0x4480ff(0x655)](Input[_0x4480ff(0x7f1)](_0x4480ff(0x5cf))));Input[_0x4480ff(0x215)](_0x4480ff(0x77f))&&this[_0x4480ff(0x716)](Input[_0x4480ff(0x7f1)]('left'));!this[_0x4480ff(0x610)](_0x4480ff(0x62d))&&Input[_0x4480ff(0x215)]('pagedown')&&this[_0x4480ff(0x28c)]();!this[_0x4480ff(0x610)]('pageup')&&Input[_0x4480ff(0x215)](_0x4480ff(0x7a5))&&this[_0x4480ff(0x1b4)]();if(this[_0x4480ff(0x791)]()!==_0x60a3a2){if(_0x4480ff(0x3b5)!==_0x4480ff(0x3b5))for(const _0x3aee42 of this[_0x4480ff(0x7c3)]){this[_0x4480ff(0x5ab)](_0x3aee42);}else this['playCursorSound']();}}},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x1a4)]=function(){const _0xe6d146=_0x193f56;if(this[_0xe6d146(0x323)]()){if(_0xe6d146(0x5c3)===_0xe6d146(0x5c3)){const _0x4afc2b=this[_0xe6d146(0x791)]();Input[_0xe6d146(0x7f1)](_0xe6d146(0x8a5))&&this['smoothSelect'](Math['min'](this[_0xe6d146(0x791)](),0x0)),Input[_0xe6d146(0x7f1)](_0xe6d146(0x7b6))&&this[_0xe6d146(0x13d)](Math[_0xe6d146(0x347)](this['index'](),this['maxItems']()-0x1)),this[_0xe6d146(0x791)]()!==_0x4afc2b&&this['playCursorSound']();}else this['_cancelButton']['x']=_0x1048b9['boxWidth']+0x4;}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x63a)]=Window_Selectable[_0x193f56(0x415)][_0x193f56(0x675)],Window_Selectable[_0x193f56(0x415)][_0x193f56(0x675)]=function(){const _0x4a4318=_0x193f56;if(this[_0x4a4318(0x544)]()){if(_0x4a4318(0x79b)==='GeVJo')this[_0x4a4318(0x801)]();else{const _0x55007e='_stored_powerUpColor';this['_colorCache']=this[_0x4a4318(0x406)]||{};if(this[_0x4a4318(0x406)][_0x55007e])return this[_0x4a4318(0x406)][_0x55007e];const _0x5c641f=_0x3b6d96[_0x4a4318(0x818)][_0x4a4318(0x7fe)][_0x4a4318(0x702)][_0x4a4318(0x240)];return this['getColorDataFromPluginParameters'](_0x55007e,_0x5c641f);}}else VisuMZ[_0x4a4318(0x818)]['Window_Selectable_processTouch'][_0x4a4318(0x865)](this);},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x801)]=function(){const _0x4fe837=_0x193f56;VisuMZ[_0x4fe837(0x818)][_0x4fe837(0x63a)]['call'](this);},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x8b1)]=function(){const _0x4dec44=_0x193f56;return VisuMZ[_0x4dec44(0x818)]['Settings'][_0x4dec44(0x899)][_0x4dec44(0x599)];},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x82f)]=function(){const _0x196e2c=_0x193f56;return VisuMZ[_0x196e2c(0x818)][_0x196e2c(0x7fe)][_0x196e2c(0x899)][_0x196e2c(0x144)];},Window_Selectable[_0x193f56(0x415)][_0x193f56(0x557)]=function(){const _0x44de6f=_0x193f56;return Window_Scrollable[_0x44de6f(0x415)][_0x44de6f(0x557)][_0x44de6f(0x865)](this)+VisuMZ[_0x44de6f(0x818)][_0x44de6f(0x7fe)][_0x44de6f(0x899)][_0x44de6f(0x5f8)];;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x326)]=Window_Selectable[_0x193f56(0x415)]['drawBackgroundRect'],Window_Selectable[_0x193f56(0x415)][_0x193f56(0x497)]=function(_0x37b3d2){const _0x527dcf=_0x193f56,_0x13ae58=VisuMZ[_0x527dcf(0x818)][_0x527dcf(0x7fe)][_0x527dcf(0x899)];if(_0x13ae58[_0x527dcf(0x41e)]===![])return;_0x13ae58[_0x527dcf(0x7e2)]?_0x13ae58['DrawItemBackgroundJS'][_0x527dcf(0x865)](this,_0x37b3d2):VisuMZ['CoreEngine'][_0x527dcf(0x326)][_0x527dcf(0x865)](this,_0x37b3d2);},VisuMZ[_0x193f56(0x818)][_0x193f56(0x396)]=Window_Gold[_0x193f56(0x415)][_0x193f56(0x197)],Window_Gold[_0x193f56(0x415)]['refresh']=function(){const _0x3447e0=_0x193f56;this[_0x3447e0(0x7a8)]()?this[_0x3447e0(0x1ff)]():VisuMZ[_0x3447e0(0x818)][_0x3447e0(0x396)][_0x3447e0(0x865)](this);},Window_Gold[_0x193f56(0x415)]['isItemStyle']=function(){const _0x46ef08=_0x193f56;if(TextManager[_0x46ef08(0x8a6)]!==this[_0x46ef08(0x8a6)]())return![];return VisuMZ[_0x46ef08(0x818)]['Settings'][_0x46ef08(0x132)][_0x46ef08(0x75e)];},Window_Gold[_0x193f56(0x415)]['drawGoldItemStyle']=function(){const _0x4d1019=_0x193f56;this['resetFontSettings'](),this[_0x4d1019(0x1e0)][_0x4d1019(0x418)](),this[_0x4d1019(0x1e0)]['fontSize']=VisuMZ[_0x4d1019(0x818)][_0x4d1019(0x7fe)][_0x4d1019(0x132)][_0x4d1019(0x5db)];const _0x5e04df=VisuMZ[_0x4d1019(0x818)][_0x4d1019(0x7fe)][_0x4d1019(0x132)]['GoldIcon'],_0x4faa52=this[_0x4d1019(0x4e5)](0x0);if(_0x5e04df>0x0){const _0xa414ac=_0x4faa52['y']+(this[_0x4d1019(0x7a2)]()-ImageManager[_0x4d1019(0x8de)])/0x2;this[_0x4d1019(0x3fe)](_0x5e04df,_0x4faa52['x'],_0xa414ac);const _0x34408e=ImageManager[_0x4d1019(0x776)]+0x4;_0x4faa52['x']+=_0x34408e,_0x4faa52['width']-=_0x34408e;}this[_0x4d1019(0x467)](ColorManager[_0x4d1019(0x4bd)]()),this['drawText'](this[_0x4d1019(0x8a6)](),_0x4faa52['x'],_0x4faa52['y'],_0x4faa52[_0x4d1019(0x890)],'left');const _0x407929=this[_0x4d1019(0x2c3)](this[_0x4d1019(0x8a6)]())+0x6;;_0x4faa52['x']+=_0x407929,_0x4faa52[_0x4d1019(0x890)]-=_0x407929,this[_0x4d1019(0x33e)]();const _0x2c0f1e=this[_0x4d1019(0x3c2)](),_0x861650=this['textWidth'](this[_0x4d1019(0x248)]?VisuMZ['GroupDigits'](this['value']()):this['value']());_0x861650>_0x4faa52[_0x4d1019(0x890)]?'mhkBI'!==_0x4d1019(0x163)?(_0x562e65['prototype']['initialize'][_0x4d1019(0x865)](this),this[_0x4d1019(0x54f)]=_0x4fddf9,this[_0x4d1019(0x6fb)]=null,this[_0x4d1019(0x8df)]()):this[_0x4d1019(0x84f)](VisuMZ[_0x4d1019(0x818)][_0x4d1019(0x7fe)][_0x4d1019(0x132)][_0x4d1019(0x115)],_0x4faa52['x'],_0x4faa52['y'],_0x4faa52[_0x4d1019(0x890)],_0x4d1019(0x5cf)):this[_0x4d1019(0x84f)](this['value'](),_0x4faa52['x'],_0x4faa52['y'],_0x4faa52['width'],_0x4d1019(0x5cf)),this[_0x4d1019(0x43d)]();},Window_StatusBase['prototype'][_0x193f56(0x5ad)]=function(_0x5d4856,_0x3bbc79,_0x26fe92,_0x4b36a7,_0x2006dd){const _0x46abe5=_0x193f56;_0x4b36a7=String(_0x4b36a7||'')[_0x46abe5(0x125)]();if(VisuMZ[_0x46abe5(0x818)][_0x46abe5(0x7fe)][_0x46abe5(0x14d)][_0x46abe5(0x113)]){if(_0x46abe5(0x3d1)!==_0x46abe5(0x107)){const _0x38813b=VisuMZ[_0x46abe5(0x781)](_0x4b36a7);_0x2006dd?(this[_0x46abe5(0x176)](_0x38813b,_0x5d4856,_0x3bbc79,this[_0x46abe5(0x349)]()),_0x26fe92-=this['gaugeLineHeight']()+0x2,_0x5d4856+=this['gaugeLineHeight']()+0x2):(this['drawIcon'](_0x38813b,_0x5d4856+0x2,_0x3bbc79+0x2),_0x26fe92-=ImageManager[_0x46abe5(0x776)]+0x4,_0x5d4856+=ImageManager['iconWidth']+0x4);}else this['contents'][_0x46abe5(0x5dd)]>=0x18&&(this[_0x46abe5(0x1e0)]['fontSize']-=0x6);}const _0x1f184e=TextManager[_0x46abe5(0x287)](_0x4b36a7);this[_0x46abe5(0x43d)](),this['changeTextColor'](ColorManager[_0x46abe5(0x4bd)]());if(_0x2006dd)this[_0x46abe5(0x1e0)][_0x46abe5(0x5dd)]=this[_0x46abe5(0x46e)](),this[_0x46abe5(0x1e0)][_0x46abe5(0x84f)](_0x1f184e,_0x5d4856,_0x3bbc79,_0x26fe92,this[_0x46abe5(0x349)](),_0x46abe5(0x77f));else{if(_0x46abe5(0x796)!==_0x46abe5(0x3a9))this['drawText'](_0x1f184e,_0x5d4856,_0x3bbc79,_0x26fe92);else{if(this['_muteSound'])return;_0x58f266['CoreEngine'][_0x46abe5(0x6f0)][_0x46abe5(0x865)](this);}}this[_0x46abe5(0x43d)]();},Window_StatusBase[_0x193f56(0x415)][_0x193f56(0x46e)]=function(){const _0x1eb008=_0x193f56;return $gameSystem[_0x1eb008(0x79d)]()-0x8;},Window_StatusBase['prototype'][_0x193f56(0x362)]=function(_0x517b47,_0x2cc4bf,_0x23fd63,_0x4061ed){const _0x49edda=_0x193f56;_0x4061ed=_0x4061ed||0xa8,this[_0x49edda(0x33e)]();if(VisuMZ[_0x49edda(0x818)][_0x49edda(0x7fe)]['UI'][_0x49edda(0x629)])'eYEhJ'===_0x49edda(0x758)?(this['_animationQueue']=[],this[_0x49edda(0x5a2)]=[],this['_pointAnimationQueue']=[],this[_0x49edda(0x4d0)]=[]):this[_0x49edda(0x619)](_0x517b47[_0x49edda(0x3be)]()['name'],_0x2cc4bf,_0x23fd63,_0x4061ed);else{const _0x170741=_0x517b47['currentClass']()[_0x49edda(0x41f)][_0x49edda(0x552)](/\\I\[(\d+)\]/gi,'');this[_0x49edda(0x84f)](_0x170741,_0x2cc4bf,_0x23fd63,_0x4061ed);}},Window_StatusBase[_0x193f56(0x415)]['drawActorNickname']=function(_0x340fe9,_0x159805,_0x15d3ff,_0x1680b6){const _0x2da9bc=_0x193f56;_0x1680b6=_0x1680b6||0x10e,this[_0x2da9bc(0x33e)]();if(VisuMZ['CoreEngine']['Settings']['UI'][_0x2da9bc(0x766)])this['drawTextEx'](_0x340fe9['nickname'](),_0x159805,_0x15d3ff,_0x1680b6);else{const _0x479b71=_0x340fe9[_0x2da9bc(0x4cd)]()[_0x2da9bc(0x552)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x340fe9[_0x2da9bc(0x4cd)](),_0x159805,_0x15d3ff,_0x1680b6);}},VisuMZ['CoreEngine'][_0x193f56(0x167)]=Window_StatusBase[_0x193f56(0x415)][_0x193f56(0x8b9)],Window_StatusBase['prototype']['drawActorLevel']=function(_0x2a87cf,_0x29b308,_0x5819a3){const _0x378a02=_0x193f56;if(this[_0x378a02(0x352)]())this['drawActorExpGauge'](_0x2a87cf,_0x29b308,_0x5819a3);VisuMZ['CoreEngine'][_0x378a02(0x167)]['call'](this,_0x2a87cf,_0x29b308,_0x5819a3);},Window_StatusBase['prototype']['isExpGaugeDrawn']=function(){const _0x229828=_0x193f56;return VisuMZ[_0x229828(0x818)][_0x229828(0x7fe)]['UI']['LvExpGauge'];},Window_StatusBase['prototype'][_0x193f56(0x276)]=function(_0x5adb4a,_0x2fd991,_0x3deb3e){const _0x2319d5=_0x193f56;if(!_0x5adb4a)return;if(!_0x5adb4a[_0x2319d5(0x17f)]())return;const _0x21d850=0x80,_0x2073b3=_0x5adb4a[_0x2319d5(0x34a)]();let _0x40c9e5=ColorManager[_0x2319d5(0x88c)](),_0x4a69af=ColorManager[_0x2319d5(0x315)]();_0x2073b3>=0x1&&(_0x40c9e5=ColorManager[_0x2319d5(0x29c)](),_0x4a69af=ColorManager[_0x2319d5(0x3e4)]()),this[_0x2319d5(0x7ed)](_0x2fd991,_0x3deb3e,_0x21d850,_0x2073b3,_0x40c9e5,_0x4a69af);},Window_EquipStatus[_0x193f56(0x415)][_0x193f56(0x3ce)]=function(){const _0x5ab4f6=_0x193f56;let _0x3622f4=0x0;for(const _0x3937b2 of VisuMZ[_0x5ab4f6(0x818)][_0x5ab4f6(0x7fe)]['Param']['DisplayedParams']){if('SKiEx'===_0x5ab4f6(0x2fe)){const _0x1cac38=this[_0x5ab4f6(0x414)](),_0x20f5cd=this[_0x5ab4f6(0x751)](_0x3622f4);this[_0x5ab4f6(0x104)](_0x1cac38,_0x20f5cd,_0x3937b2),_0x3622f4++;}else{const _0x1ea46b=_0x185135[_0x5ab4f6(0x737)]((_0x1858cf-_0x36ec96)/_0x1c2140,_0xdc1ec2||'Linear'),_0x5137c9=_0x35036c[_0x5ab4f6(0x737)]((_0x486c55-_0x5b7a59+0x1)/_0x3edfbc,_0x540bce||_0x5ab4f6(0x6b7)),_0x4e5bee=(_0x34aaaf-_0x3244d4*_0x1ea46b)/(0x1-_0x1ea46b);return _0x4e5bee+(_0x4aba41-_0x4e5bee)*_0x5137c9;}}},Window_EquipStatus[_0x193f56(0x415)][_0x193f56(0x282)]=function(_0x43bde1,_0x23a9ce,_0x32c0a6){const _0x46aff7=_0x193f56,_0xdcaef=this['paramX']()-this['itemPadding']()*0x2;this[_0x46aff7(0x5ad)](_0x43bde1,_0x23a9ce,_0xdcaef,_0x32c0a6,![]);},Window_EquipStatus[_0x193f56(0x415)][_0x193f56(0x85f)]=function(_0x410d2d,_0x3de8a3,_0x57b052){const _0x2568ed=_0x193f56,_0x562ca2=this[_0x2568ed(0x20a)]();this['resetTextColor'](),this['drawText'](this[_0x2568ed(0x80e)]['paramValueByName'](_0x57b052,!![]),_0x410d2d,_0x3de8a3,_0x562ca2,_0x2568ed(0x5cf));},Window_EquipStatus[_0x193f56(0x415)]['drawRightArrow']=function(_0x43ee62,_0x27f1ce){const _0x529a60=_0x193f56,_0x4705a3=this['rightArrowWidth']();this[_0x529a60(0x467)](ColorManager[_0x529a60(0x4bd)]());const _0xb2daa5=VisuMZ['CoreEngine'][_0x529a60(0x7fe)]['UI'][_0x529a60(0x5f4)];this['drawText'](_0xb2daa5,_0x43ee62,_0x27f1ce,_0x4705a3,_0x529a60(0x6aa));},Window_EquipStatus[_0x193f56(0x415)][_0x193f56(0x7d9)]=function(_0x2dca4c,_0x365d73,_0x9aa7ed){const _0x4195e8=_0x193f56,_0x3f77f9=this[_0x4195e8(0x20a)](),_0x1600ab=this['_tempActor'][_0x4195e8(0x5e2)](_0x9aa7ed),_0x5d4572=_0x1600ab-this[_0x4195e8(0x80e)][_0x4195e8(0x5e2)](_0x9aa7ed);this[_0x4195e8(0x467)](ColorManager[_0x4195e8(0x6f9)](_0x5d4572)),this[_0x4195e8(0x84f)](this[_0x4195e8(0x22f)][_0x4195e8(0x5e2)](_0x9aa7ed,!![]),_0x2dca4c,_0x365d73,_0x3f77f9,_0x4195e8(0x5cf));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x75d)]=Window_EquipItem[_0x193f56(0x415)][_0x193f56(0x12d)],Window_EquipItem[_0x193f56(0x415)][_0x193f56(0x12d)]=function(_0x53e58c){const _0x825f0e=_0x193f56;return _0x53e58c&&this[_0x825f0e(0x80e)]?this[_0x825f0e(0x80e)][_0x825f0e(0x2bb)](_0x53e58c):VisuMZ[_0x825f0e(0x818)][_0x825f0e(0x75d)][_0x825f0e(0x865)](this,_0x53e58c);},Window_StatusParams[_0x193f56(0x415)]['maxItems']=function(){const _0x322935=_0x193f56;return VisuMZ['CoreEngine']['Settings'][_0x322935(0x14d)]['DisplayedParams']['length'];},Window_StatusParams['prototype'][_0x193f56(0x104)]=function(_0x4d3f25){const _0x2d2dff=_0x193f56,_0x19842b=this['itemLineRect'](_0x4d3f25),_0x529fdb=VisuMZ[_0x2d2dff(0x818)]['Settings']['Param'][_0x2d2dff(0x70a)][_0x4d3f25],_0x4198eb=TextManager[_0x2d2dff(0x287)](_0x529fdb),_0x1f7e3b=this[_0x2d2dff(0x80e)]['paramValueByName'](_0x529fdb,!![]);this[_0x2d2dff(0x5ad)](_0x19842b['x'],_0x19842b['y'],0xa0,_0x529fdb,![]),this[_0x2d2dff(0x33e)](),this[_0x2d2dff(0x84f)](_0x1f7e3b,_0x19842b['x']+0xa0,_0x19842b['y'],0x3c,'right');};if(VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)]['KeyboardInput'][_0x193f56(0x46b)]){VisuMZ[_0x193f56(0x818)]['Settings'][_0x193f56(0x26a)]['QwertyLayout']&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x193f56(0x43b),'OK']);;VisuMZ[_0x193f56(0x818)][_0x193f56(0x482)]=Window_NameInput[_0x193f56(0x415)]['initialize'],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(_0x4cee50){const _0x79a604=_0x193f56;this['_mode']=this[_0x79a604(0x28e)](),VisuMZ[_0x79a604(0x818)]['Window_NameInput_initialize'][_0x79a604(0x865)](this,_0x4cee50),this[_0x79a604(0x57f)]===_0x79a604(0x874)?'wcWMB'==='qJJfh'?this[_0x79a604(0x475)](_0x2b3708['note']):this[_0x79a604(0x17e)](0x0):_0x79a604(0x109)===_0x79a604(0x465)?this[_0x79a604(0x24a)](_0x471172):(Input[_0x79a604(0x418)](),this['deselect']());},Window_NameInput[_0x193f56(0x415)][_0x193f56(0x28e)]=function(){const _0x5303d5=_0x193f56;if(Input['isGamepadConnected']())return'default';return VisuMZ[_0x5303d5(0x818)][_0x5303d5(0x7fe)][_0x5303d5(0x26a)]['DefaultMode']||_0x5303d5(0x35e);},VisuMZ['CoreEngine'][_0x193f56(0x1cc)]=Window_NameInput['prototype'][_0x193f56(0x50a)],Window_NameInput[_0x193f56(0x415)]['processHandling']=function(){const _0x9189c2=_0x193f56;if(!this[_0x9189c2(0x2c1)]())return;if(!this[_0x9189c2(0x4f7)])return;if(this[_0x9189c2(0x57f)]===_0x9189c2(0x35e)&&Input[_0x9189c2(0x8dc)]())this['switchModes'](_0x9189c2(0x874));else{if(Input['isSpecialCode']('backspace'))Input[_0x9189c2(0x418)](),this[_0x9189c2(0x2c4)]();else{if(Input[_0x9189c2(0x7f1)]('tab')){if('QkQry'===_0x9189c2(0x34e))Input['clear'](),this[_0x9189c2(0x57f)]===_0x9189c2(0x35e)?_0x9189c2(0x7c4)===_0x9189c2(0x794)?_0x2268da[_0x9189c2(0x147)]():this[_0x9189c2(0x486)]('default'):this[_0x9189c2(0x486)]('keyboard');else return _0x1627b6[_0x9189c2(0x60f)];}else{if(this[_0x9189c2(0x57f)]===_0x9189c2(0x35e)){if('UiROS'!==_0x9189c2(0x2c0))this[_0x9189c2(0x3fd)]();else return _0xb93ef4[_0x9189c2(0x711)]['ItemRect'][_0x9189c2(0x865)](this);}else Input[_0x9189c2(0x2ea)]('escape')?(Input[_0x9189c2(0x418)](),this['switchModes'](_0x9189c2(0x35e))):VisuMZ[_0x9189c2(0x818)]['Window_NameInput_processHandling'][_0x9189c2(0x865)](this);}}}},VisuMZ[_0x193f56(0x818)][_0x193f56(0x3b4)]=Window_NameInput[_0x193f56(0x415)]['processTouch'],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x675)]=function(){const _0x308a0d=_0x193f56;if(!this[_0x308a0d(0x7be)]())return;if(this[_0x308a0d(0x57f)]===_0x308a0d(0x35e)){if(TouchInput[_0x308a0d(0x7f1)]()&&this[_0x308a0d(0x828)]()){if('oiOeZ'===_0x308a0d(0x22c))return this[_0x308a0d(0x430)]()[_0x308a0d(0x3e5)];else this[_0x308a0d(0x486)](_0x308a0d(0x874));}else{if(TouchInput[_0x308a0d(0x4c4)]()){if(_0x308a0d(0x4f4)===_0x308a0d(0x493))return 0x1;else this[_0x308a0d(0x486)](_0x308a0d(0x874));}}}else VisuMZ[_0x308a0d(0x818)][_0x308a0d(0x3b4)][_0x308a0d(0x865)](this);},Window_NameInput[_0x193f56(0x415)]['processKeyboardHandling']=function(){const _0x859fef=_0x193f56;if(Input['isSpecialCode']('enter')){if(_0x859fef(0x864)===_0x859fef(0x2db))return _0x6fecdc['layoutSettings'][_0x859fef(0x4eb)][_0x859fef(0x865)](this);else Input[_0x859fef(0x418)](),this[_0x859fef(0x31c)]();}else{if(Input[_0x859fef(0x805)]!==undefined){let _0x3dddfe=Input[_0x859fef(0x805)],_0x566a56=_0x3dddfe['length'];for(let _0x374d3a=0x0;_0x374d3a<_0x566a56;++_0x374d3a){this[_0x859fef(0x54d)][_0x859fef(0x3f8)](_0x3dddfe[_0x374d3a])?SoundManager['playOk']():SoundManager['playBuzzer']();}Input['clear']();}}},Window_NameInput[_0x193f56(0x415)][_0x193f56(0x486)]=function(_0x443054){const _0x5e6a54=_0x193f56;let _0x5ec177=this[_0x5e6a54(0x57f)];this[_0x5e6a54(0x57f)]=_0x443054,_0x5ec177!==this[_0x5e6a54(0x57f)]&&(_0x5e6a54(0x1d7)===_0x5e6a54(0x677)?_0x2461bd[_0x577d31]=_0x391d0c[_0x5e6a54(0x490)][_0x5c5c2f[_0x16ddb5]]:(this[_0x5e6a54(0x197)](),SoundManager['playOk'](),this[_0x5e6a54(0x57f)]===_0x5e6a54(0x874)?this[_0x5e6a54(0x17e)](0x0):this[_0x5e6a54(0x17e)](-0x1)));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x30f)]=Window_NameInput[_0x193f56(0x415)][_0x193f56(0x102)],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x102)]=function(_0x2c952b){const _0x5c1153=_0x193f56;if(this[_0x5c1153(0x57f)]===_0x5c1153(0x35e)&&!Input[_0x5c1153(0x1a9)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x5c1153(0x30f)][_0x5c1153(0x865)](this,_0x2c952b),this['switchModes'](_0x5c1153(0x874));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x6a2)]=Window_NameInput[_0x193f56(0x415)]['cursorUp'],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x5c1)]=function(_0x554372){const _0x249451=_0x193f56;if(this[_0x249451(0x57f)]===_0x249451(0x35e)&&!Input['isArrowPressed']())return;if(Input[_0x249451(0x783)]())return;VisuMZ[_0x249451(0x818)][_0x249451(0x6a2)][_0x249451(0x865)](this,_0x554372),this['switchModes']('default');},VisuMZ[_0x193f56(0x818)][_0x193f56(0x2b9)]=Window_NameInput[_0x193f56(0x415)]['cursorRight'],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x655)]=function(_0x28e2c7){const _0x1abd3e=_0x193f56;if(this[_0x1abd3e(0x57f)]===_0x1abd3e(0x35e)&&!Input['isArrowPressed']())return;if(Input[_0x1abd3e(0x783)]())return;VisuMZ[_0x1abd3e(0x818)][_0x1abd3e(0x2b9)][_0x1abd3e(0x865)](this,_0x28e2c7),this['switchModes']('default');},VisuMZ[_0x193f56(0x818)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x193f56(0x415)][_0x193f56(0x716)],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x716)]=function(_0x28acaf){const _0x3132b0=_0x193f56;if(this[_0x3132b0(0x57f)]==='keyboard'&&!Input[_0x3132b0(0x1a9)]())return;if(Input[_0x3132b0(0x783)]())return;VisuMZ['CoreEngine'][_0x3132b0(0x35a)]['call'](this,_0x28acaf),this[_0x3132b0(0x486)](_0x3132b0(0x874));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x2d4)]=Window_NameInput[_0x193f56(0x415)][_0x193f56(0x28c)],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x28c)]=function(){const _0x3bd073=_0x193f56;if(this[_0x3bd073(0x57f)]===_0x3bd073(0x35e))return;if(Input[_0x3bd073(0x783)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown'][_0x3bd073(0x865)](this),this[_0x3bd073(0x486)](_0x3bd073(0x874));},VisuMZ[_0x193f56(0x818)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x193f56(0x415)]['cursorPageup'],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x1b4)]=function(){const _0x465c59=_0x193f56;if(this[_0x465c59(0x57f)]===_0x465c59(0x35e))return;if(Input[_0x465c59(0x783)]())return;VisuMZ[_0x465c59(0x818)]['Window_NameInput_cursorPageup'][_0x465c59(0x865)](this),this[_0x465c59(0x486)](_0x465c59(0x874));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x305)]=Window_NameInput[_0x193f56(0x415)]['refresh'],Window_NameInput[_0x193f56(0x415)][_0x193f56(0x197)]=function(){const _0x11fae4=_0x193f56;if(this['_mode']===_0x11fae4(0x35e)){this[_0x11fae4(0x1e0)][_0x11fae4(0x418)](),this[_0x11fae4(0x6a1)][_0x11fae4(0x418)](),this[_0x11fae4(0x33e)]();let _0x41832c=VisuMZ['CoreEngine'][_0x11fae4(0x7fe)][_0x11fae4(0x26a)][_0x11fae4(0x518)]['split']('\x0a'),_0x5989b3=_0x41832c['length'],_0x1062f5=(this[_0x11fae4(0x3aa)]-_0x5989b3*this[_0x11fae4(0x7a2)]())/0x2;for(let _0x4a2954=0x0;_0x4a2954<_0x5989b3;++_0x4a2954){if(_0x11fae4(0x4c5)!=='owbyu'){let _0x12b179=_0x41832c[_0x4a2954],_0x4a0423=this[_0x11fae4(0x350)](_0x12b179)['width'],_0x584be2=Math[_0x11fae4(0x66d)]((this['contents']['width']-_0x4a0423)/0x2);this[_0x11fae4(0x619)](_0x12b179,_0x584be2,_0x1062f5),_0x1062f5+=this[_0x11fae4(0x7a2)]();}else{if(!this[_0x11fae4(0x323)]())return;_0x457976[_0x11fae4(0x783)]()?this[_0x11fae4(0x52f)]():_0x532f6a['prototype'][_0x11fae4(0x23a)][_0x11fae4(0x865)](this);}}}else _0x11fae4(0x5f3)===_0x11fae4(0x5f3)?VisuMZ['CoreEngine'][_0x11fae4(0x305)]['call'](this):this[_0x11fae4(0x39a)][_0x11fae4(0x57a)](_0x5ccc3d[_0x11fae4(0x711)]['StatusBgType']);};};function _0x3273(_0x1a4b05,_0x34e922){const _0xc32b73=_0xc32b();return _0x3273=function(_0x327381,_0x41f7b3){_0x327381=_0x327381-0xff;let _0x613557=_0xc32b73[_0x327381];return _0x613557;},_0x3273(_0x1a4b05,_0x34e922);}VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fa)]=Window_ShopSell[_0x193f56(0x415)][_0x193f56(0x12d)],Window_ShopSell[_0x193f56(0x415)][_0x193f56(0x12d)]=function(_0x1b3e76){const _0x272442=_0x193f56;if(VisuMZ['CoreEngine'][_0x272442(0x7fe)][_0x272442(0x168)][_0x272442(0x61e)]&&DataManager['isKeyItem'](_0x1b3e76)){if(_0x272442(0x646)!==_0x272442(0x646))_0xb0ca06[_0x272442(0x5a4)](),_0x297a1f[_0x272442(0x335)]=new _0x29b11f(),_0x5b0b0a['addChild'](_0x47a404[_0x272442(0x335)]);else return![];}else{if(_0x272442(0x545)===_0x272442(0x3bb)){let _0x8eb1ba=this['currentValue']();this['useDigitGrouping']()&&(_0x8eb1ba=_0x58757d[_0x272442(0x164)](_0x8eb1ba));const _0x100605=this[_0x272442(0x7dc)]()-0x1,_0xdd2b19=this['textHeight']?this[_0x272442(0x7c8)]():this[_0x272442(0x80d)]();this[_0x272442(0x8a9)](),this['bitmap'][_0x272442(0x84f)](_0x8eb1ba,0x0,0x0,_0x100605,_0xdd2b19,'right');}else return VisuMZ[_0x272442(0x818)][_0x272442(0x7fa)][_0x272442(0x865)](this,_0x1b3e76);}},Window_NumberInput[_0x193f56(0x415)][_0x193f56(0x544)]=function(){return![];};VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x26a)][_0x193f56(0x4c9)]&&(VisuMZ['CoreEngine'][_0x193f56(0x294)]=Window_NumberInput[_0x193f56(0x415)][_0x193f56(0x372)],Window_NumberInput['prototype'][_0x193f56(0x372)]=function(){const _0x2b3f69=_0x193f56;VisuMZ[_0x2b3f69(0x818)]['Window_NumberInput_start'][_0x2b3f69(0x865)](this),this['select'](this[_0x2b3f69(0x74f)]-0x1),Input['clear']();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x591)]=Window_NumberInput[_0x193f56(0x415)][_0x193f56(0x7bc)],Window_NumberInput[_0x193f56(0x415)][_0x193f56(0x7bc)]=function(){const _0x4eaed3=_0x193f56;if(!this[_0x4eaed3(0x7be)]())return;if(Input[_0x4eaed3(0x783)]())_0x4eaed3(0x21c)===_0x4eaed3(0x708)?_0x17e044[_0x4eaed3(0x818)][_0x4eaed3(0x305)]['call'](this):this[_0x4eaed3(0x52f)]();else{if(Input[_0x4eaed3(0x2ea)](_0x4eaed3(0x333))){if(_0x4eaed3(0x3b6)===_0x4eaed3(0x3d8)){let _0x111420=_0x4eaed3(0x15a)+_0x59857a+'Total';if(this['checkCacheKey'](_0x111420))return this['_cache'][_0x111420];return this[_0x4eaed3(0x6fc)][_0x111420]=_0x2c4723[_0x4eaed3(0x818)][_0x4eaed3(0x7fe)]['Param'][_0x4eaed3(0x3ec)][_0x4eaed3(0x865)](this,_0x275d7a),this[_0x4eaed3(0x6fc)][_0x111420];}else this[_0x4eaed3(0x7ef)]();}else{if(Input['_inputSpecialKeyCode']===0x2e)this['processKeyboardDelete']();else{if(Input[_0x4eaed3(0x3cf)]===0x24)this[_0x4eaed3(0x837)]();else Input['_inputSpecialKeyCode']===0x23?this[_0x4eaed3(0x156)]():VisuMZ[_0x4eaed3(0x818)][_0x4eaed3(0x591)][_0x4eaed3(0x865)](this);}}}},Window_NumberInput[_0x193f56(0x415)][_0x193f56(0x23a)]=function(){const _0x23f841=_0x193f56;if(!this[_0x23f841(0x323)]())return;Input['isNumpadPressed']()?this[_0x23f841(0x52f)]():Window_Selectable[_0x23f841(0x415)][_0x23f841(0x23a)][_0x23f841(0x865)](this);},Window_NumberInput[_0x193f56(0x415)][_0x193f56(0x1a4)]=function(){},Window_NumberInput[_0x193f56(0x415)]['processKeyboardDigitChange']=function(){const _0x2b4ab0=_0x193f56;if(String(this['_number'])[_0x2b4ab0(0x8f1)]>=this[_0x2b4ab0(0x74f)])return;const _0x274738=Number(String(this[_0x2b4ab0(0x2aa)])+Input[_0x2b4ab0(0x805)]);if(isNaN(_0x274738))return;this['_number']=_0x274738;const _0x2add30='9'[_0x2b4ab0(0x5b1)](this['_maxDigits']);this['_number']=this[_0x2b4ab0(0x2aa)]['clamp'](0x0,_0x2add30),Input['clear'](),this[_0x2b4ab0(0x197)](),SoundManager[_0x2b4ab0(0x250)](),this[_0x2b4ab0(0x17e)](this[_0x2b4ab0(0x74f)]-0x1);},Window_NumberInput['prototype'][_0x193f56(0x7ef)]=function(){const _0x52d13d=_0x193f56;this[_0x52d13d(0x2aa)]=Number(String(this['_number'])[_0x52d13d(0x8e1)](0x0,-0x1)),this['_number']=Math[_0x52d13d(0x347)](0x0,this[_0x52d13d(0x2aa)]),Input[_0x52d13d(0x418)](),this[_0x52d13d(0x197)](),SoundManager[_0x52d13d(0x250)](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x193f56(0x8ce)]=function(){const _0x5a8706=_0x193f56;this[_0x5a8706(0x2aa)]=Number(String(this[_0x5a8706(0x2aa)])[_0x5a8706(0x44a)](0x1)),this[_0x5a8706(0x2aa)]=Math['max'](0x0,this['_number']),Input['clear'](),this[_0x5a8706(0x197)](),SoundManager[_0x5a8706(0x250)](),this[_0x5a8706(0x17e)](this['_maxDigits']-0x1);});;function _0xc32b(){const _0x275e86=['OUTCUBIC','IconXParam9','Cpxck','iHRXi','drawText','Show\x20Scrolling\x20Text\x20Script\x20Error','onerror','Scene_MenuBase_mainAreaHeight','startAutoNewGame','_windowLayer','ScreenShake','drawGameSubtitle','moveCancelButtonSideButtonLayout','LEFT','isDying','_mp','_setupEventHandlers','StatusEquipBgType','BACKSPACE','Bitmap_resize','drawCurrentParam','getColorDataFromPluginParameters','maxTp','pages','Scene_Skill_create','sAzuI','call','%1〘End\x20Choice\x20Selection〙%1','INSERT','setEasingType','_commandWindow','vxhxY','updateOpacity','ESwCw','_inputWindow','itemBackColor1','ColorTPGauge2','SParamVocab2','Game_BattlerBase_initMembers','_pageupButton','_shakeSpeed','default','SxtoB','_changingClass','vertJS','showDevTools','XParamVocab0','WIN_ICO_00','loadBitmap','senVO','xparamFlatBonus','setActorHomeRepositioned','_scene','CallHandlerJS','toLowerCase','NewGameCommonEvent','ENTER','932392fTSnjf','Sprite_Actor_setActorHome','_encounterCount','TyzbO','IconParam4','measureTextWidth','reservePlayTestNewGameCommonEvent','isSideView','expGaugeColor1','VIYuy','none','_stored_crisisColor','width','shake','_drawTextOutline','addLoadListener','GSQQQ','HelpBgType','kFiXQ','paramFlat','BuyBgType','Window','updateOpen','BoxMargin','Actor','KEEP','result','height','IconXParam6','IconSParam3','_targetY','Sprite_AnimationMV_processTimingData','paramMax','home','currencyUnit','push','setupBattleTestItems','setupValueFont','skillId','FkeFJ','Game_Event_start','alignBottom','xScrollLinkedOffset','platform','JYuOn','colSpacing','21NhlzEz','button','updateMotion','sv_enemies','Game_Interpreter_command122','Scene_Map_createSpritesetFix','sparamFlat2','drawActorLevel','itemSuccessRate','atbActive','system','encounterStepsMinimum','Sprite_Button_initialize','eventsXyNt','SParameterFormula','DefaultStyle','〘Scrolling\x20Text〙\x0a','_pictureName','_context','Mute','ljuvM','0.00','_actorWindow','BattleSystem','_centerElementCoreEngine','attackSkillId','startAnimation','milpM','processKeyboardDelete','QoHyR','paramRateJS','updatePictureCoordinates','categoryWindowRect','PERCENT','OUTQUAD','FKDOc','sCQts','INQUAD','ListRect','log','RVVXZ','Scene_Battle_update','isGamepadTriggered','hjhIZ','iconHeight','setup','map','slice','Graphics_defaultStretchMode','openURL','toString','TPB\x20ACTIVE','createChildSprite','Scene_Battle_createSpriteset_detach','isMVAnimation','initMembersCoreEngine','jXsiL','loadTitle2','createCancelButton','_targetOffsetX','meVolume','F24','windowOpacity','length','catchLoadError','WIN_OEM_FJ_ROYA','jzYLu','Scene_Battle_createSpriteset','EnableJS','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','SkillTypeBgType','buttonAssistKey5','helpAreaTopSideButtonLayout','DEF','_commonEventLayers','cursorDown','Window_Base_createTextState','drawItem','jmcXF','SystemSetSideView','OaRFx','useFontWidthFix','Ghuro','disable','ExportCurTroopText','framebuffer','Window_Base_update','XRVZC','IconParam2','mapId','playTestF7','resize','DrawIcons','ColorMaxLvGauge1','GoldOverlap','_playTestFastMode','exportAllTroopStrings','F7key','Game_Actor_paramBase','_animation','INQUART','Scene_Base_terminate','gainGold','Sprite_Animation_setViewport','CRI','setAnchor','URL','WbLKg','ARRAYSTRUCT','DBaQx','toUpperCase','aqrcc','processPointAnimationRequests','vBIRT','_mainSprite','_upArrowSprite','style','maxGold','isEnabled','worldTransform','clamp','restore','initMembers','Gold','listWindowRect','wait','areButtonsHidden','TextFmt','Scene_Map_updateMain','ARRAYEVAL','pictures','EditRect','SystemSetBattleSystem','onClick','smoothSelect','isGamepadButtonPressed','UONNZ','Input_clear','tab','INOUTSINE','BTestWeapons','RowSpacing','buttons','OPEN_CURLY_BRACKET','playBuzzer','_targetScaleX','Window_Selectable_cursorUp','nTBEN','CodeJS','WIN_OEM_FJ_MASSHOU','Param','ColorTPGauge1','setHandler','DigitGroupingDamageSprites','mirror','_targetOpacity','DimColor1','viewport','sparamRate1','processKeyboardEnd','Basic','SlotRect','BattleManager_processEscape','xparam','DataManager_setupNewGame','retrievePointAnimation','RPGMAKER_VERSION','dpMua','buttonAssistKey%1','asin','Pixelated','padding','mhkBI','GroupDigits','WIN_OEM_CLEAR','getBackgroundOpacity','Window_StatusBase_drawActorLevel','QoL','FpGYs','SParamVocab0','escape','battlebacks2','innerWidth','hit','characters','isGamepadConnected','SellBgType','oWvhw','tHwfs','Spriteset_Base_isAnimationPlaying','process_VisuMZ_CoreEngine_Settings','drawIconBySize','PictureShowIcon','\x0a\x0a\x0a\x0a\x0a','_statusEquipWindow','_isPlaytest','RevertPreserveNumbers','setActorHome','MRG','select','isActor','maxItems','ListBgType','STB','_active','PictureEraseAll','Abbreviation','IconSParam2','ExportCurMapText','RMWBK','umvDD','addChildToBack','dashToggle','ycAwV','key%1','cyWWb','children','nw.gui','setViewportCoreEngineFix','xparamRate1','ImprovedAccuracySystem','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','remove','KeyUnlisted','refresh','canUse','playOk','rDFmU','Scene_Map_createMenuButton','OuPFu','updatePictureAntiZoom','VisuMZ_2_BattleSystemCTB','_targetScaleY','EncounterRateMinimum','Cslqz','lIoZK','save','processCursorHomeEndTrigger','_customModified','constructor','skillTypeWindowRect','IeBKH','isArrowPressed','IconSParam0','OpenSpeed','random','OPEN_BRACKET','ColorDeath','OPEN_PAREN','down','WIN_OEM_JUMP','ARRAYSTR','MainMenu','cursorPageup','XParamVocab1','HAFXM','NGupA','TranslucentOpacity','Game_Picture_y','tdtsr','StatusEquipRect','_lastPluginCommandInterpreter','guardSkillId','_baseSprite','onButtonImageLoad','Window_Base_drawText','AnimationID','Sprite_Picture_updateOrigin','ExtractStrFromMap','AzotI','OutlineColorGauge','mainCommandWidth','oHZrm','_cacheScaleX','dimColor1','WIN_OEM_BACKTAB','optSideView','Window_NameInput_processHandling','create','loadSystem','XParamVocab4','vertical','JeIcR','Rate1','MAT','apply','normalColor','targetOpacity','pVQSO','scale','WOWnB','animationNextDelay','animationId','command111','_targets','LoadMenu','bgsVolume','contents','_stored_expGaugeColor1','RepositionEnemies130','AllMaps','%1%2','_lastOrigin','VbnDz','_forcedTroopView','Scene_Map_initialize','buttonAssistOffset3','drawGameTitle','maxLevel','isAnimationForEach','NIHEL','Beach','missed','drawCircle','Flat','TAB','ATK','MKhmO','_centerElement','SERZE','commandWindowRect','markCoreEngineModified','yNUvI','normal','Game_Picture_move','currentLevelExp','SParamVocab7','NUM_LOCK','drawGoldItemStyle','SNfUU','CategoryRect','AiUNi','NameMenu','CustomParam','_stored_ctGaugeColor2','xqamn','CommandList','Smooth','STR','paramWidth','initCoreEngineScreenShake','events','checkCacheKey','buttonAssistKey1','ZorHW','MenuLayout','GRD','createBackground','inputWindowRect','ItemRect','isRepeated','BottomButtons','createCommandWindow','createFauxAnimationQueue','_viewportSize','LESS_THAN','_stored_tpGaugeColor1','QmgxN','itszo','_stored_tpCostColor','_pictureContainer','menuShowButton','horzJS','min','ifVET','setSideView','Fwjbr','AnimationMirrorOffset','aMOFH','zgwrk','_cancelButton','destroyCoreEngineMarkedBitmaps','stencilFunc','LjTsr','ctecn','UROHe','_tempActor','adjustBoxSize','jBewN','VisuMZ_2_BattleSystemETB','dvVng','IconSet','IconXParam4','_shouldPreventDefault','OpenURL','setMainFontSize','tpColor','processCursorMove','getPointAnimationLayer','VOLUME_MUTE','sin','Scene_Status_create','GoldChange','ColorPowerUp','DTB','INCUBIC','F20','filter','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','skillTypes','RYTIU','_digitGrouping','VOLUME_DOWN','setSkill','win32','toFixed','gQPJw','SEMICOLON','lgYHj','playCursor','updateAnchor','_battleField','ExportString','blt','setupButtonImage','profileWindowRect','slotWindowRect','ParseArmorNotetags','INOUTBOUNCE','LvExpGauge','stretch','DECIMAL','Total','getInputMultiButtonStrings','IconParam0','orzLs','BaseTexture','Scene_Name_onInputOk','createJsQuickFunction','NUMPAD1','ZxNtg','mainAreaTopSideButtonLayout','includes','Scene_Shop_create','_mirror','KeyboardInput','setupFont','Troop%1','buttonAssistOk','uKQWI','dputz','ProfileBgType','INOUTCIRC','backgroundBitmap','Bitmap_blt','YqOxR','onKeyDownKeysF6F7','drawActorExpGauge','DxSNb','loadIconBitmap','numActions','hOGlf','PictureFilename','Window_Selectable_itemRect','IKZUU','updateData','xparamFlatJS','DOLLAR','faceWidth','drawParamName','%1〘Choice\x20%2〙\x20%3%1','isItem','DetachBattlePictureContainer','%1/','param','_battlerName','Game_Actor_levelUp','StatusRect','#%1','cursorPagedown','buttonAssistText2','defaultInputMode','makeCoreEngineCommandList','PHA','moveMenuButtonSideButtonLayout','SnapshotOpacity','targetScaleY','Window_NumberInput_start','drtxD','(\x5cd+)>','YYZUb','initVisuMZCoreEngine','keyMapper','Enable','Input_onKeyDown','maxLvGaugeColor1','FontWidthFix','_shakeDuration','Bitmap_strokeRect','mainAreaTop','ioxCh','sparamPlus1','uJcLs','SParamVocab1','ParseWeaponNotetags','CustomParamIcons','ZOOM','ULVDH','eSfyi','_number','WIN_OEM_RESET','QgkAm','randomJS','fadeSpeed','currentValue','DigitGroupingGaugeSprites','isBottomButtonMode','MCR','Bitmap_clearRect','DETACH_PICTURE_CONTAINER','163123iQkZpa','getInputButtonString','_stored_normalColor','buyWindowRect','Window_NameInput_cursorRight','OnPYx','canEquip','Exported_Script_%1.txt','removeAllPointAnimations','BdYLZ','_onKeyPress','IKJkI','isOpen','getCoreEngineScreenShakeStyle','textWidth','processBack','_width','Graphics_centerElement','PictureID','ForceNoPlayTest','showFauxAnimations','qcYGs','itemWindowRect','buttonAssistKey4','quit','reserveCommonEvent','_windowskin','process_VisuMZ_CoreEngine_RegExp','isMenuButtonAssistEnabled','touchUI','onInputBannedWords','Window_NameInput_cursorPagedown','NoTileShadows','CommandRect','cos','buttonAssistOffset5','SceneManager_initialize','DocumentTitleFmt','zUceG','ColorHPGauge1','CNT','CRSEL','focus','EbsMr','zvgPc','text','pressed','contains','Speed','TXwDQ','_sideButtonLayout','OptionsBgType','xnncx','isSpecialCode','StatusParamsBgType','HRG','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','Scene_Map_createSpriteset','239430DVwBVX','updateWaitMode','TsAfQ','updatePosition','CategoryBgType','isEventRunning','initialLevel','nxmcf','_drawTextShadow','lQQWb','_profileWindow','lZoot','Power','FontSize','snapForBackground','SKiEx','_stored_systemColor','title','UlkTB','imageSmoothingEnabled','levelUpRecovery','_pointAnimationQueue','Window_NameInput_refresh','updateDocumentTitle','ExtJS','Game_Interpreter_command355','SParamVocab5','runCombinedScrollingTextAsCode','AMPERSAND','SystemLoadImages','ynYsM','setSideButtonLayout','Window_NameInput_cursorDown','mpGaugeColor1','transform','pesko','_hp','drawSegment','expGaugeColor2','loadWindowskin','SideButtons','Plus','buttonAssistOffset4','Scene_Name_create','ZmLAv','onNameOk','Scene_Base_create','Scene_Boot_loadSystemImages','sparamFlatJS','updateDashToggle','qtIqz','MultiKeyFmt','isCursorMovable','forceOutOfPlaytest','onEscapeSuccess','Window_Selectable_drawBackgroundRect','addEventListener','ctkmL','valueOutlineColor','ColorManager_loadWindowskin','processEscape','641340FYPYfl','Game_Interpreter_updateWaitMode','child_process','SELECT','clone','IconSParam4','BackOpacity','backspace','contentsOpacity','_pictureCoordinatesWindow','Bitmap_drawText','Input_pollGamepads','Scene_MenuBase_mainAreaTop','F23','SParamVocab9','move','nah','sv_actors','resetTextColor','WIN_OEM_COPY','iJIWS','_realScale','(\x5cd+\x5c.?\x5cd+)>','GZmrZ','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','Game_Interpreter_command105','Scene_Map_updateMainMultiply','max','paramFlatBonus','gaugeLineHeight','expRate','INCIRC','maxBattleMembers','show','QkQry','_pauseSignSprite','textSizeEx','BgFilename1','isExpGaugeDrawn','Upper\x20Left','NumberBgType','consumeItem','CEV','catchException','ParamMax','_lastX','Window_NameInput_cursorLeft','subtitle','mmp','nextLevelExp','keyboard','description','pixelated','393039TGVtnU','drawActorClass','paramBase','Game_Interpreter_command111','note','terminate','WtNeD','Scene_MenuBase_createPageButtons','command357','isKeyItem','refreshDimmerBitmap','damageColor','KANA','xoAbI','titles2','yIvTs','SaveMenu','start','xparamRate','ZpPyi','OUTQUART','writeFile','tgbdO','Plus2','createBuffer','mute','charAt','STRUCT','learnings','qVWLE','END','movePageButtonSideButtonLayout','isBusy','members','DigitGroupingStandardText','subjectHitRate','SubfolderParse','pow','centerSprite','ParseClassNotetags','processAlwaysEscape','_offsetY','UWaQU','_stored_hpGaugeColor2','updateLastTarget','CONVERT','drawActorSimpleStatus','BACK_SLASH','setCoreEngineScreenShakeStyle','Scene_Map_updateScene','_opacity','_rate','registerCommand','Window_Gold_refresh','mhp','_anchor','EvzMJ','_statusWindow','ovUMe','WindowLayer_render','THYIJ','_playtestF7Looping','alpha','ItemBackColor1','return\x200','Scene_Map_createSpriteset_detach','Spriteset_Base_initialize','_CoreEngineSettings','<%1\x20%2:[\x20]','ModernControls','VOLUME_UP','globalAlpha','UDjQc','innerHeight','TextStr','buttonAssistWindowSideRect','_moveEasingType','Game_Actor_changeClass','loadMapData','outlineColorGauge','wXTLf','Sprite_Gauge_currentValue','calcCoreEasing','Window_NameInput_processTouch','GzVhE','ZayCN','context','Scene_Item_create','isFullDocumentTitle','JUNJA','oeIYb','fyZFn','NUMPAD7','currentClass','repositionCancelButtonSideButtonLayout','_pagedownButton','createTroopNote','value','levelUp','INELASTIC','qDdnS','overrideMimeType','rbcZO','XParamVocab3','SPACE','SHIFT','_baseTexture','ndtnb','_pollGamepads','drawAllParams','_inputSpecialKeyCode','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','UihFx','calcEasing','IconSParam5','PictureEraseRange','loadGameImagesCoreEngine','ExtractStrFromTroop','match','yIuIY','windowRect','TRG','goldWindowRect','gaugeHeight','TNCpF','FDR','iaKJc','CustomParamAbb','COLON','sellWindowRect','BTestItems','maxLvGaugeColor2','level','gSMbN','battlebacks1','TitlePicButtons','_bitmap','checkSmartEventCollision','ShowJS','XParameterFormula','CommandBgType','EXCLAMATION','EditBgType','mainAreaHeightSideButtonLayout','_spriteset','_coreEasingType','QTMhy','ONE','_pressed','_addShadow','Bitmap_fillRect','add','EIvYE','CLOSE_PAREN','WIN_OEM_AUTO','CCdWF','processKeyboardHandling','drawIcon','isPhysical','OzGgK','gradientFillRect','BcgIp','irvdt','Type','ZERO','_colorCache','PositionX','〘Show\x20Text〙\x0a','BTestArmors','drawGameVersion','OkText','faJOf','isWindowMaskingEnabled','buttonAssistCancel','isMaskingEnabled','alwaysDash','forceStencil','Game_Picture_x','bgs','itemPadding','prototype','isTpb','_statusParamsWindow','clear','Bitmap_initialize','smbmQ','batch','Game_Action_updateLastTarget','FontSmoothing','ShowItemBackground','name','clearStencil','XdoVw','setClickHandler','NewGameCommonEventAll','XBnzx','code','redraw','powerUpColor','volume','hTlcX','_animationQueue','setupCoreEngine','_onceParallelInterpreters','GoldMax','_gamepadWait','Subtitle','enemy','ALWAYS','WIN_OEM_WSCTRL','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','isSideButtonLayout','rTjoQ','CommandWidth','setBackgroundOpacity','ENTER_SPECIAL','isOptionValid','helpWindowRect','Page','FTB','resetFontSettings','AGI','_clientArea','list','INOUTEXPO','_commandList','_closing','_stored_expGaugeColor2','ColorMPGauge2','Map%1','AllTroops','ActorTPColor','ALTGR','substring','round','bgm','render','targetX','_makeFontNameText','isPlaytest','MREZR','wtHak','eHBis','StatusMenu','STENCIL_TEST','mev','hideButtonFromView','YuXgk','terms','SEPARATOR','xparamPlus1','buttonAssistWindowRect','alphabetic','OUTBOUNCE','ParseTilesetNotetags','Game_BattlerBase_refresh','_opening','dimColor2','updateFauxAnimations','_shakePower','BKImQ','initCoreEngine','changeTextColor','CTRL','Unnamed','EbLYr','EnableNameInput','updateOnceParallelInterpreters','getCustomBackgroundSettings','smallParamFontSize','evaluate','X:\x20%1','ItemBgType','PrLMH','successRate','boxWidth','parseForcedGameTroopSettingsCoreEngine','_stored_maxLvGaugeColor2','Renderer','VisuMZ_2_BattleSystemSTB','updateBackOpacity','_backSprite2','XParamVocab9','OUTQUINT','updatePositionCoreEngineShakeOriginal','mpGaugeColor2','WIN_OEM_PA3','REPLACE','bitmap','Window_NameInput_initialize','UGEYP','DELETE','boxHeight','switchModes','ValueJS','createCustomParameter','initBasic','kbEFT','tnCqg','Duration','animationShouldMirror','hjKSD','([\x5c+\x5c-]\x5cd+)([%％])>','stringKeyMap','targetObjects','img/%1/','vKWfc','kBvIn','titleCommandWindow','oLewn','drawBackgroundRect','sparamPlus2','fillText','updateCurrentEvent','PixelateImageRendering','ESC','STENCIL_BUFFER_BIT','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Scene_Base_createWindowLayer','_hovered','ParseSkillNotetags','JEgvh','buttonAssistText4','TGR','removeOnceParallelInterpreter','buttonAssistText1','_coreEngineShakeStyle','numberWindowRect','addOnceParallelInterpreter','PAUSE','kirvW','processMoveCommand','Spriteset_Battle_createEnemies','createWindowLayer','_targetAnchor','TextManager_param','GvxRg','_targetOffsetY','getBattleSystem','IconSParam7','initDigitGrouping','createSpriteset','RegExp','MRF','WIN_OEM_FJ_LOYA','_refreshArrows','_backgroundSprite','Game_Action_itemEva','systemColor','onKeyDown','setMute','ColorExpGauge2','gBBit','_movementDuration','drawValue','isCancelled','Vsxta','MAX_SAFE_INTEGER','strokeRect','ActorMPColor','EnableNumberInput','tpGaugeColor2','WIN_OEM_FJ_TOUROKU','createPointAnimation','nickname','actor','Origin','_balloonQueue','_stored_ctGaugeColor1','translucentOpacity','ItemPadding','fJddv','MAXMP','Input_setupEventHandlers','WIN_OEM_FINISH','gybnc','getButtonAssistLocation','Bauvn','ColorCTGauge2','backOpacity','_dimmerSprite','hide','makeInputButtonString','isPlaying','join','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','WOyFq','ONE_MINUS_SRC_ALPHA','itemLineRect','buttonAssistText%1','setupNewGame','tileWidth','nKAUW','loadSystemImages','SellRect','subject','NewGameBoot','setTargetAnchor','ShowDevTools','update','wdnkb','reduce','InputBgType','vpaHZ','outlineColor','trim','active','createTextState','FINAL','WVJqj','retrieveFauxAnimation','ItemMenu','Rate','filters','_coreEasing','displayY','originalJS','_defaultStretchMode','parse','isBottomHelpMode','isEnemy','smooth','Game_Party_consumeItem','scaleSprite','_stored_mpCostColor','processHandling','Scene_Menu_create','isNextScene','_pointAnimationSprites','BlurFilter','responseText','SceneManager_onKeyDown','createButtonAssistWindow','NEAREST','createCustomBackgroundImages','_backgroundFilter','990684TjmasJ','RequireFocus','fillRect','NameInputMessage','ButtonHeight','SwitchToggleOne','SLEEP','SmartEventCollisionPriority','IconParam1','MvAnimationRate','Version','F18','NUMPAD8','Flat2','PRESERVCONVERSION(%1)','enableDigitGrouping','jsonToZip','IconSParam1','XvmqF','randomInt','tpCostColor','targetSpritePosition','removeChild','setSize','F15','exec','processKeyboardDigitChange','kWUhO','params','ColorMPCost','KWrKh','Chztc','itemHit','applyEasing','sparamPlus','NUMPAD2','Game_System_initialize','isPressed','INQUINT','Bitmap_drawTextOutline','DigitGroupingLocale','IconXParam2','Game_Action_numRepeats','loadPicture','optionsWindowRect','_itemWindow','lxUnV','isUseModernControls','nlUSt','createEnemies','HelpRect','seVolume','dAikC','initButtonHidden','stop','LoadError','_editWindow','checkSubstitute','_data','maxCols','setMoveEasingType','replace','zUsbT','xdg-open','BgFilename2','createDimmerSprite','itemHeight','equips','_hideTileShadows','Dweut','canAttack','PictureEasingType','_backSprite1','MEV','duration','createMenuButton','open','tilesets','_troopId','makeEncounterCount','NUMPAD6','createTitleButtons','changeClass','ItuLu','_categoryWindow','text%1','drawCurrencyValue','playCancel','Game_Temp_initialize','Spriteset_Base_update','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','fnobq','_repositioned','ExtractStrFromList','OptionsMenu','object','UnFna','_stored_powerDownColor','initialBattleSystem','FKaSr','enableDigitGroupingEx','setBackgroundType','SystemSetFontSize','targetPosition','DboiC','WIN_OEM_FJ_JISHO','_mode','version','setFrame','Scene_Boot_updateDocumentTitle','DBzAc','WIN_OEM_PA2','waiting','helpAreaHeight','Padding','Scene_Boot_startNormalGame','setEnemyAction','Scene_MenuBase_createCancelButton','_stored_tpGaugeColor2','AIUOa','RepositionEnemies','TitleCommandList','wGHFM','defineProperty','Window_NumberInput_processDigitChange','doesNameContainBannedWords','EXECUTE','drawFace','destroy','Gftqr','application/json','textAlign','ColSpacing','Game_Screen_initialize','Window_Selectable_cursorDown','flush','applyForcedGameTroopSettingsCoreEngine','CommonEventID','startShake','ActorRect','renderNoMask','_fauxAnimationQueue','ButtonAssist','playLoad','traitObjects','ParseEnemyNotetags','buttonAssistOffset2','reserveNewGameCommonEvent','F22','doIpF','removeFauxAnimation','Scene_Title_drawGameTitle','drawParamText','BuyRect','_pictureCoordinatesMode','_timerSprite','repeat','jcyXG','OFPxF','buttonAssistSwitch','JFUzB','ExportStrFromAllMaps','_downArrowSprite','_onKeyDown','DIVIDE','TmXKq','buttonAssistKey3','data/','Game_Map_setup','Scene_Boot_onDatabaseLoaded','itemRect','command105','cursorUp','hQYnx','xQOZe','KeySHIFT','makeTargetSprites','CustomParamType','showPicture','enemies','ColorTPCost','_screenX','scaleMode','_colorTone','VisuMZ_1_BattleCore','SParamVocab3','right','getColor','HASH','targetScaleX','_backSprite','ActorBgType','CreateBattleSystemID','mainAreaBottom','MINUS','_stored_deathColor','MODECHANGE','DATABASE','GoldFontSize','down2','fontSize','animations','CancelText','makeDeepCopy','evaded','paramValueByName','setValue','Game_Troop_setup','option','paramName','onload','setWindowPadding','AntiZoomPictures','IconParam3','displayX','getLevel','BattleManager_update','_listWindow','clearOnceParallelInterpreters','MAXHP','xparamPlus2','bLraM','jFsea','ParamArrow','HIT','FadeSpeed','Bitmap_gradientFillRect','ItemHeight','LineHeight','MDF','playCursorSound','stencilOp','StatusBgType','rgba(0,\x200,\x200,\x201.0)','Sprite_Picture_loadBitmap','showPointAnimations','ItemBackColor2','_scaleX','F17','PositionJS','setCommonEvent','isSmartEventCollisionOn','command122','INOUTQUAD','parallaxes','_currentMap','outbounce','Scene_Base_terminateAnimationClearBugFix','integer','_blank','eva','isHandled','updateClose','isMapScrollLinked','buttonAssistKey2','animationBaseDelay','isNwjs','ShortcutScripts','cancel','Game_Picture_initBasic','drawTextEx','origin','resetBattleSystem','yScrollLinkedOffset','NqiHJ','KeyItemProtect','test','ExportAllMapText','deathColor','updateCoreEasing','ohaUm','GET','Game_Action_setAttack','Opacity','format','sparam','TextCodeClassNames','_helpWindow','Game_Picture_calcEasing','KttDH','pagedown','gaugeBackColor','Icon','endAnimation','LevelUpFullHp','AnimationPoint','ButtonFadeSpeed','RRSRS','fiWJU','Symbol','isSceneMap','printError','WTZMf','Window_Selectable_processTouch','ctrlKey','YJQeY','pictureId','qHKxN','_isButtonHidden','CustomParamNames','VisuMZ_1_OptionsCore','LmtJX','createPointAnimationTargets','NUMPAD4','playOnceParallelInterpreter','qJYSI','anchorCoreEasing','IconSParam6','_stored_powerUpColor','Input_shouldPreventDefault','OUTSINE','EXMDt','ARRAYFUNC','_refreshPauseSign','OnLoadJS','EndingID','OUTEXPO','WIN_ICO_HELP','mpCostColor','targets','cursorRight','BTestAddedQuantity','xparamRate2','paramRate2','AgHOd','parameters','buttonY','bind','_screenY','ETB','_forcedBattleSys','isNormalPriority','zUOmD','RIGHT','LIymi','IDs','applyCoreEasing','goto','gLCbV','setHome','ColorGaugeBack','IconXParam8','paramRate','visible','floor','pwNrw','EVA','INBOUNCE','setupCoreEasing','OptionsRect','CrisisRate','xparamPlus','processTouch','isPointAnimationPlaying','ZvHcr','EQUAL','REC','PRINT','hpGaugeColor1','sparamFlat1','playEscape','isForFriend','processTimingData','pointY','ParseAllNotetags','_targetX','drYmX','isGameActive','updateMove','wHQCh','Tilemap_addShadow','PERIOD','BasicParameterFormula','GEILh','toLocaleString','Flat1','openingSpeed','SkillTypeRect','requestPointAnimation','mainAreaHeight','SystemSetWindowPadding','updatePadding','EscapeAlways','BTB','numRepeats','_duration','offsetY','blendFunc','EVAL','ScaleX','Keyboard','Graphics_printError','buttonAreaHeight','areButtonsOutsideMainUI','number','Myuhv','contentsBack','Window_NameInput_cursorUp','addChild','uBWjg','Map%1.json','%1\x0a','requestFauxAnimation','_cacheScaleY','1.4.4','center','onInputOk','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','%1〘Choice\x20Cancel〙%1','NUMPAD0','HDCyf','adjustPictureAntiZoom','PDR','DummyBgType','SUBTRACT','LoNxF','itemHitImprovedAccuracy','_scaleY','Linear','createFauxAnimationSprite','RVvao','process_VisuMZ_CoreEngine_CustomParameters','WASD','loadTitle1','F13','ParseStateNotetags','setAction','exit','erasePicture','isMaxLevel','easingType','startNormalGame','INOUTQUINT','ParseItemNotetags','anchor','VAoVX','makeActionList','IconParam6','Manual','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_movementWholeDuration','Window_Base_initialize','bWGgn','Game_Event_isCollidedWithEvents','darwin','setViewport','BgType','_effectsContainer','DummyRect','TextJS','inBattle','useDigitGroupingEx','Scene_Battle_createCancelButton','DamageColor','repositionEnemiesByResolution','ColorPowerDown','updateOrigin','performEscape','JwAsf','position','NUMPAD3','PTB','getGamepads','Game_Picture_show','EQUALS','_numberWindow','_refreshBack','updatePositionCoreEngineShakeVert','F11','hgeiV','rgba(0,\x200,\x200,\x200.7)','WIN_OEM_ENLW','processCursorMoveModernControls','sceneTerminationClearEffects','keyCode','Sprite_Animation_processSoundTimings','Title','font','SceneManager_isGameActive','ActorHPColor','picture','RWrxy','statusWindowRect','horizontal','paramchangeTextColor','getCombinedScrollingText','_clickHandler','_cache','Chance','Game_Action_itemHit','Scene_Battle_createSpritesetFix','kbNaw','padZero','Color','_isWindow','createPointAnimationSprite','clearForcedGameTroopSettingsCoreEngine','PLUS','_offsetX','FXVxQ','mJNoe','DisplayedParams','updatePositionCoreEngineShakeRand','PIPE','uKraD','ADD','Window_StatusBase_drawActorSimpleStatus','paramRate1','layoutSettings','xparamFlat2','coreEngineRepositionEnemies','xoBkE','Game_Picture_updateMove','cursorLeft','ParseActorNotetags','ParamChange','measureTextWidthNoRounding','kAJVr','updatePositionCoreEngine','_drawTextBody','iDHgd','commandWindowRows','Untitled','Spriteset_Base_destroy','_internalTextures','VisuMZ_2_BattleSystemOTB','playTestCtrlT','getLastPluginCommandInterpreter','updatePositionCoreEngineShakeHorz','_digitGroupingEx','popScene','91542Kvocwq','updateEffekseer','ExtDisplayedParams','playMiss','advanced','top','%1:\x20Exit\x20','process_VisuMZ_CoreEngine_Functions','ColorCTGauge1','VYYKu','LSKdf','Window_Selectable_processCursorMove','updateShadow','isAnimationPlaying','indexOf','ApplyEasing','setCoreEngineUpdateWindowBg','qCcYc','shift','adjustSprite','editWindowRect','DetachMapPictureContainer','_index','Window_Base_drawIcon','paramPlus','numberShowButton','textColor','Tdikb','_goldWindow','Game_Interpreter_PluginCommand','makeDocumentTitle','targetContentsOpacity','Graphics','HebIg','removeAllFauxAnimations','〘Common\x20Event\x20%1:\x20%2〙\x20End','DWCmP','targetEvaRate','allowShiftScrolling','_maxDigits','removePointAnimation','paramY','OTB','textBaseline','Max','playTestF6','sparamPlusJS','_muteSound','Gtbkb','_paramPlus','XTBmh','MapOnceParallel','concat','Window_EquipItem_isEnabled','ItemStyle','Script\x20Call\x20Error','Sprite_Gauge_gaugeRate','Sprite_AnimationMV_updatePosition','ScreenResolution','gaugeRate','ColorMaxLvGauge2','YdvVm','TextCodeNicknames','SCROLL_LOCK','background','_lastY','NUMPAD5','sqrt','KPUtL','SceneManager_exit','jztih','clearRect','ttKZq','process_VisuMZ_CoreEngine_jsQuickFunctions','encounterStep','moveRelativeToResolutionChange','rcCqP','pmBZD','iconWidth','updatePointAnimations','KYZcJ','retreat','YgaKt','TFBPP','makeFontSmaller','itemEva','opacity','left','OutlineColor','GetParamIcon','exportAllMapStrings','isNumpadPressed','iBgzQ','_list','OWtPm','battleSystem','PreserveNumbers','buttonAssistWindowButtonRect','command355','Scene_Unlisted','VmIkQ','_target','_stored_pendingColor','setGuard','BannedWords','index','targetBackOpacity','PBhaQ','fdMaB','Bitmap_drawCircle','pMrAh','skills','setLastPluginCommandInterpreter','zxdzC','mpColor','GeVJo','onDatabaseLoaded','mainFontSize','ZQlbW','createFauxAnimation','processFauxAnimationRequests','VisuMZ_2_BattleSystemBTB','lineHeight','WUpQh','addCommand','pageup','storeMapData','NUM','isItemStyle','setBattleSystem','Conditional\x20Branch\x20Script\x20Error','_buttonAssistWindow','filterArea','setAttack','Spriteset_Base_updatePosition','inbounce','_dummyWindow','CONTEXT_MENU','BattleManager_checkSubstitute','updatePlayTestF7','MAX_GL_TEXTURES','fyJNV','end','usableSkills','QUOTE','GoldIcon','isAnimationOffsetXMirrored','_slotWindow','processDigitChange','〘Common\x20Event\x20%1:\x20%2〙\x20Start','isOpenAndActive','OutlineColorDmg','outlineColorDmg','INOUTQUART','CTB','_fauxAnimationSprites','xQKBY','initialize','isMagical','ACCEPT','textHeight','DimColor2','isCollidedWithEvents','itypeId','startMove','LUK','makeFontBigger','WIN_ICO_CLEAR','ConvertParams','AutoStretch','EXR','_smooth','MenuBg','Sprite_destroy','uMVDF','isActiveTpb','MDR','drawNewParam','updateScene','uiAreaWidth','bitmapWidth','process_VisuMZ_CoreEngine_Notetags','_skillTypeWindow','stypeId','GoldBgType','item','DrawItemBackgroundJS','TimeProgress','useDigitGrouping','sXIEu','titles1','MhKDw','BottomHelp','blockWidth','KeyTAB','OWtcl','_storedMapText','drawGauge','HVUBW','processKeyboardBackspace','updateMainMultiply','isTriggered','_stored_hpGaugeColor1','LINEAR','areTileShadowsHidden','_sellWindow','IHqWn','wholeDuration','_createInternalTextures','performMiss','Window_ShopSell_isEnabled','ParamName','IconXParam5','xparamFlat1','Settings','isAlive','GREATER_THAN','processTouchModernControls','SwitchRandomizeOne','WQrsJ','F19','_inputString','paramBaseAboveLevel99','targetY','onMoveEnd','HOME','isSceneBattle','_optionsWindow','measureText','bitmapHeight','_actor','NEckp','UvHLM','VisuMZ_2_BattleSystemPTB','AGjbf','StartID','ImgLoad','connected','WIN_OEM_CUSEL','updateMain','CoreEngine','setupCustomRateCoreEngine','OUTCIRC','pop','_menuButton','evade','F6key','SideView','xparamPlusJS','MlNGx','_registerKeyInput','%2%1%3','GoldRect','Window_Base_drawCharacter','openness','faces','isTouchedInsideFrame','_origin','mLDaA','TCR','SParamVocab6','_hideButtons','string','rowSpacing','Scene_Map_update','UNDERSCORE','drawCharacter','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','IconXParam3','addWindow','createPageButtons','processKeyboardHome','Dnvrj','PA1','enable','SCALE_MODES','needsUpdate','setColorTone','INEXPO','gainSilentTp','ceil','drawTextTopAligned','VisuMZ_2_BattleSystemFTB','jZiqm','Cbkjo','Scene_Equip_create','ExportStrFromAllTroops','Bitmap_measureTextWidth','AccuracyBoost','status','up2'];_0xc32b=function(){return _0x275e86;};return _0xc32b();}Window_TitleCommand[_0x193f56(0x442)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x58e)],Window_TitleCommand[_0x193f56(0x415)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x193f56(0x415)]['makeCoreEngineCommandList']=function(){const _0x47d28a=_0x193f56;for(const _0x29da41 of Window_TitleCommand[_0x47d28a(0x442)]){if('oLewn'===_0x47d28a(0x496)){if(_0x29da41[_0x47d28a(0x3eb)][_0x47d28a(0x865)](this)){const _0x190338=_0x29da41['Symbol'];let _0xc34148=_0x29da41['TextStr'];if(['',_0x47d28a(0x71f)][_0x47d28a(0x267)](_0xc34148))_0xc34148=_0x29da41[_0x47d28a(0x6d6)][_0x47d28a(0x865)](this);const _0x2a9342=_0x29da41['EnableJS'][_0x47d28a(0x865)](this),_0x593d18=_0x29da41['ExtJS'][_0x47d28a(0x865)](this);this['addCommand'](_0xc34148,_0x190338,_0x2a9342,_0x593d18),this[_0x47d28a(0x14f)](_0x190338,_0x29da41[_0x47d28a(0x880)][_0x47d28a(0x65c)](this,_0x593d18));}}else{var _0x44be84=_0x57a815(_0x227f0c['$1']);_0x55f9f0+=_0x44be84;}}},Window_GameEnd[_0x193f56(0x442)]=VisuMZ[_0x193f56(0x818)][_0x193f56(0x7fe)][_0x193f56(0x210)]['GameEnd'][_0x193f56(0x207)],Window_GameEnd[_0x193f56(0x415)]['makeCommandList']=function(){const _0x290022=_0x193f56;this[_0x290022(0x28f)]();},Window_GameEnd['prototype']['makeCoreEngineCommandList']=function(){const _0x3e2ff6=_0x193f56;for(const _0x39af55 of Window_GameEnd[_0x3e2ff6(0x442)]){if(_0x39af55[_0x3e2ff6(0x3eb)]['call'](this)){const _0x24710d=_0x39af55[_0x3e2ff6(0x636)];let _0x5b2258=_0x39af55[_0x3e2ff6(0x3ab)];if(['',_0x3e2ff6(0x71f)][_0x3e2ff6(0x267)](_0x5b2258))_0x5b2258=_0x39af55[_0x3e2ff6(0x6d6)]['call'](this);const _0xd89165=_0x39af55[_0x3e2ff6(0x8f6)]['call'](this),_0x27b0f2=_0x39af55[_0x3e2ff6(0x307)]['call'](this);this['addCommand'](_0x5b2258,_0x24710d,_0xd89165,_0x27b0f2),this['setHandler'](_0x24710d,_0x39af55[_0x3e2ff6(0x880)]['bind'](this,_0x27b0f2));}}};function Window_ButtonAssist(){const _0x48e9fc=_0x193f56;this[_0x48e9fc(0x7c5)](...arguments);}Window_ButtonAssist[_0x193f56(0x415)]=Object[_0x193f56(0x1cd)](Window_Base['prototype']),Window_ButtonAssist['prototype'][_0x193f56(0x1a6)]=Window_ButtonAssist,Window_ButtonAssist[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(_0x5ed4a3){const _0x4572fd=_0x193f56;this['_data']={},Window_Base['prototype'][_0x4572fd(0x7c5)][_0x4572fd(0x865)](this,_0x5ed4a3),this['setBackgroundType'](VisuMZ[_0x4572fd(0x818)]['Settings'][_0x4572fd(0x5a3)][_0x4572fd(0x6d3)]||0x0),this[_0x4572fd(0x197)]();},Window_ButtonAssist[_0x193f56(0x415)][_0x193f56(0x7ce)]=function(){const _0x44ce47=_0x193f56;this[_0x44ce47(0x1e0)][_0x44ce47(0x5dd)]<=0x60&&(this[_0x44ce47(0x1e0)][_0x44ce47(0x5dd)]+=0x6);},Window_ButtonAssist[_0x193f56(0x415)][_0x193f56(0x77c)]=function(){const _0x5d4733=_0x193f56;this[_0x5d4733(0x1e0)]['fontSize']>=0x18&&(_0x5d4733(0x7eb)==='AOOPW'?_0x76a454+=_0x5abb66:this[_0x5d4733(0x1e0)][_0x5d4733(0x5dd)]-=0x6);},Window_ButtonAssist[_0x193f56(0x415)][_0x193f56(0x4f0)]=function(){const _0x7865cb=_0x193f56;Window_Base[_0x7865cb(0x415)][_0x7865cb(0x4f0)][_0x7865cb(0x865)](this),this['updateKeyText']();},Window_ButtonAssist[_0x193f56(0x415)][_0x193f56(0x692)]=function(){const _0x86a853=_0x193f56;this[_0x86a853(0x162)]=SceneManager['_scene'][_0x86a853(0x4d9)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x193f56(0x415)]['updateKeyText']=function(){const _0x4782fe=_0x193f56,_0x3763af=SceneManager[_0x4782fe(0x87f)];for(let _0x53d105=0x1;_0x53d105<=0x5;_0x53d105++){if(_0x4782fe(0x8d6)!==_0x4782fe(0x8d6)){var _0xf9534d=_0xc4ef04(_0x4fd177['$1']);_0x3a44c7+=_0xf9534d;}else{if(this[_0x4782fe(0x54f)][_0x4782fe(0x18d)[_0x4782fe(0x627)](_0x53d105)]!==_0x3763af['buttonAssistKey%1'['format'](_0x53d105)]())return'kFiXQ'!==_0x4782fe(0x896)?this[_0x4782fe(0x7ff)]()&&this[_0x4782fe(0x313)]<this[_0x4782fe(0x397)]*_0x55c5f2[_0x4782fe(0x818)]['Settings'][_0x4782fe(0x14d)]['CrisisRate']:this[_0x4782fe(0x197)]();if(this[_0x4782fe(0x54f)][_0x4782fe(0x56a)['format'](_0x53d105)]!==_0x3763af[_0x4782fe(0x4e6)['format'](_0x53d105)]())return this['refresh']();}}},Window_ButtonAssist[_0x193f56(0x415)][_0x193f56(0x197)]=function(){const _0x36aa45=_0x193f56;this[_0x36aa45(0x1e0)][_0x36aa45(0x418)]();for(let _0x57ec61=0x1;_0x57ec61<=0x5;_0x57ec61++){this[_0x36aa45(0x314)](_0x57ec61);}},Window_ButtonAssist['prototype'][_0x193f56(0x314)]=function(_0x25dfdb){const _0x477fdc=_0x193f56,_0x18bbcb=this[_0x477fdc(0x16d)]/0x5,_0x5bf031=SceneManager[_0x477fdc(0x87f)],_0x4d3650=_0x5bf031[_0x477fdc(0x15f)['format'](_0x25dfdb)](),_0x115d22=_0x5bf031[_0x477fdc(0x4e6)[_0x477fdc(0x627)](_0x25dfdb)]();this[_0x477fdc(0x54f)][_0x477fdc(0x18d)['format'](_0x25dfdb)]=_0x4d3650,this[_0x477fdc(0x54f)][_0x477fdc(0x56a)['format'](_0x25dfdb)]=_0x115d22;if(_0x4d3650==='')return;if(_0x115d22==='')return;const _0x5eadae=_0x5bf031['buttonAssistOffset%1'[_0x477fdc(0x627)](_0x25dfdb)](),_0x1b5fff=this[_0x477fdc(0x414)](),_0x442fee=_0x18bbcb*(_0x25dfdb-0x1)+_0x1b5fff+_0x5eadae,_0x174671=VisuMZ['CoreEngine']['Settings'][_0x477fdc(0x5a3)][_0x477fdc(0x136)];this[_0x477fdc(0x619)](_0x174671[_0x477fdc(0x627)](_0x4d3650,_0x115d22),_0x442fee,0x0,_0x18bbcb-_0x1b5fff*0x2);},VisuMZ['CoreEngine'][_0x193f56(0x32d)]=Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x2f0)],Game_Interpreter[_0x193f56(0x415)][_0x193f56(0x2f0)]=function(){const _0x483f75=_0x193f56;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x483f75(0x818)]['UpdatePictureCoordinates']();return VisuMZ[_0x483f75(0x818)][_0x483f75(0x32d)][_0x483f75(0x865)](this);},VisuMZ[_0x193f56(0x818)]['UpdatePictureCoordinates']=function(){const _0x58b272=_0x193f56,_0x39ee41=$gameTemp[_0x58b272(0x5af)]||0x0;(_0x39ee41<0x0||_0x39ee41>0x64||TouchInput[_0x58b272(0x4c4)]()||Input['isTriggered'](_0x58b272(0x617)))&&($gameTemp[_0x58b272(0x5af)]=undefined,Input[_0x58b272(0x418)](),TouchInput[_0x58b272(0x418)]());const _0xecddcb=$gameScreen[_0x58b272(0x6f5)](_0x39ee41);return _0xecddcb&&(_0xecddcb['_x']=TouchInput['_x'],_0xecddcb['_y']=TouchInput['_y']),VisuMZ[_0x58b272(0x818)][_0x58b272(0x8d1)](),$gameTemp[_0x58b272(0x5af)]!==undefined;},VisuMZ[_0x193f56(0x818)][_0x193f56(0x8d1)]=function(){const _0x4ab80f=_0x193f56,_0x586bfb=SceneManager[_0x4ab80f(0x87f)];if(!_0x586bfb)return;!_0x586bfb[_0x4ab80f(0x335)]&&(SoundManager[_0x4ab80f(0x5a4)](),_0x586bfb['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x586bfb['addChild'](_0x586bfb[_0x4ab80f(0x335)])),$gameTemp[_0x4ab80f(0x5af)]===undefined&&(SoundManager[_0x4ab80f(0x56c)](),_0x586bfb[_0x4ab80f(0x52b)](_0x586bfb[_0x4ab80f(0x335)]),_0x586bfb[_0x4ab80f(0x335)]=undefined);};function Window_PictureCoordinates(){const _0x4a9248=_0x193f56;this[_0x4a9248(0x7c5)](...arguments);}Window_PictureCoordinates[_0x193f56(0x415)]=Object['create'](Window_Base[_0x193f56(0x415)]),Window_PictureCoordinates[_0x193f56(0x415)][_0x193f56(0x1a6)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x193f56(0x415)][_0x193f56(0x7c5)]=function(){const _0x5432d7=_0x193f56;this['_lastOrigin']=_0x5432d7(0x33c),this[_0x5432d7(0x359)]='nah',this['_lastY']=_0x5432d7(0x33c);const _0x34dd1f=this[_0x5432d7(0x3d9)]();Window_Base[_0x5432d7(0x415)]['initialize'][_0x5432d7(0x865)](this,_0x34dd1f),this['setBackgroundType'](0x2);},Window_PictureCoordinates['prototype']['windowRect']=function(){const _0x128d7b=_0x193f56;let _0x108f49=0x0,_0x14d73a=Graphics[_0x128d7b(0x89f)]-this['lineHeight'](),_0x226e7f=Graphics[_0x128d7b(0x890)],_0x4f7350=this['lineHeight']();return new Rectangle(_0x108f49,_0x14d73a,_0x226e7f,_0x4f7350);},Window_PictureCoordinates[_0x193f56(0x415)][_0x193f56(0x692)]=function(){const _0x28f1de=_0x193f56;this[_0x28f1de(0x162)]=0x0;},Window_PictureCoordinates['prototype'][_0x193f56(0x4f0)]=function(){const _0x3a0314=_0x193f56;Window_Base[_0x3a0314(0x415)][_0x3a0314(0x4f0)]['call'](this),this[_0x3a0314(0x27e)]();},Window_PictureCoordinates[_0x193f56(0x415)][_0x193f56(0x27e)]=function(){const _0x444163=_0x193f56;if(!this[_0x444163(0x83c)]())return;this[_0x444163(0x197)]();},Window_PictureCoordinates[_0x193f56(0x415)]['needsUpdate']=function(){const _0x3dc02b=_0x193f56,_0x58cfa5=$gameTemp[_0x3dc02b(0x5af)],_0x1e426a=$gameScreen['picture'](_0x58cfa5);return _0x1e426a?this['_lastOrigin']!==_0x1e426a[_0x3dc02b(0x829)]||this[_0x3dc02b(0x359)]!==_0x1e426a['_x']||this[_0x3dc02b(0x769)]!==_0x1e426a['_y']:![];},Window_PictureCoordinates[_0x193f56(0x415)][_0x193f56(0x197)]=function(){const _0x3f1720=_0x193f56;this[_0x3f1720(0x1e0)]['clear']();const _0x57610c=$gameTemp[_0x3f1720(0x5af)],_0x3d61fa=$gameScreen[_0x3f1720(0x6f5)](_0x57610c);if(!_0x3d61fa)return;this[_0x3f1720(0x1e5)]=_0x3d61fa['_origin'],this[_0x3f1720(0x359)]=_0x3d61fa['_x'],this[_0x3f1720(0x769)]=_0x3d61fa['_y'];const _0xab1966=ColorManager[_0x3f1720(0x86e)]();this[_0x3f1720(0x1e0)][_0x3f1720(0x517)](0x0,0x0,this[_0x3f1720(0x16d)],this['innerHeight'],_0xab1966);const _0xf4103='\x20Origin:\x20%1'[_0x3f1720(0x627)](_0x3d61fa['_origin']===0x0?_0x3f1720(0x353):'Center'),_0xff6582=_0x3f1720(0x470)[_0x3f1720(0x627)](_0x3d61fa['_x']),_0x2a60d3='Y:\x20%1'[_0x3f1720(0x627)](_0x3d61fa['_y']),_0x40ff0a=_0x3f1720(0x72e)[_0x3f1720(0x627)](TextManager['getInputButtonString'](_0x3f1720(0x617)));let _0x2a67b0=Math[_0x3f1720(0x66d)](this[_0x3f1720(0x16d)]/0x4);this[_0x3f1720(0x84f)](_0xf4103,_0x2a67b0*0x0,0x0,_0x2a67b0),this[_0x3f1720(0x84f)](_0xff6582,_0x2a67b0*0x1,0x0,_0x2a67b0,'center'),this[_0x3f1720(0x84f)](_0x2a60d3,_0x2a67b0*0x2,0x0,_0x2a67b0,'center');const _0x4a9c1a=this['textSizeEx'](_0x40ff0a)[_0x3f1720(0x890)],_0x9ba75f=this[_0x3f1720(0x16d)]-_0x4a9c1a;this[_0x3f1720(0x619)](_0x40ff0a,_0x9ba75f,0x0,_0x4a9c1a);},VisuMZ['ShowDevTools']=function(_0x20aede){const _0xbab1c8=_0x193f56;if(Utils[_0xbab1c8(0x439)](_0xbab1c8(0x61f))){var _0x7bd6c5=require(_0xbab1c8(0x190))[_0xbab1c8(0x899)]['get']();SceneManager['showDevTools']();if(_0x20aede)setTimeout(_0x7bd6c5['focus'][_0xbab1c8(0x65c)](_0x7bd6c5),0x190);}},VisuMZ['ApplyEasing']=function(_0xba719d,_0x4f270f){const _0xa5480b=_0x193f56;_0x4f270f=_0x4f270f[_0xa5480b(0x125)]();var _0x2d4ba2=1.70158,_0x4cb95a=0.7;switch(_0x4f270f){case _0xa5480b(0x7f3):return _0xba719d;case'INSINE':return-0x1*Math[_0xa5480b(0x2d7)](_0xba719d*(Math['PI']/0x2))+0x1;case _0xa5480b(0x64b):return Math['sin'](_0xba719d*(Math['PI']/0x2));case _0xa5480b(0x142):return-0.5*(Math[_0xa5480b(0x2d7)](Math['PI']*_0xba719d)-0x1);case _0xa5480b(0x8d7):return _0xba719d*_0xba719d;case _0xa5480b(0x8d4):return _0xba719d*(0x2-_0xba719d);case _0xa5480b(0x608):return _0xba719d<0.5?0x2*_0xba719d*_0xba719d:-0x1+(0x4-0x2*_0xba719d)*_0xba719d;case _0xa5480b(0x242):return _0xba719d*_0xba719d*_0xba719d;case _0xa5480b(0x84b):var _0x21f256=_0xba719d-0x1;return _0x21f256*_0x21f256*_0x21f256+0x1;case'INOUTCUBIC':return _0xba719d<0.5?0x4*_0xba719d*_0xba719d*_0xba719d:(_0xba719d-0x1)*(0x2*_0xba719d-0x2)*(0x2*_0xba719d-0x2)+0x1;case _0xa5480b(0x11b):return _0xba719d*_0xba719d*_0xba719d*_0xba719d;case _0xa5480b(0x375):var _0x21f256=_0xba719d-0x1;return 0x1-_0x21f256*_0x21f256*_0x21f256*_0x21f256;case _0xa5480b(0x7c1):var _0x21f256=_0xba719d-0x1;return _0xba719d<0.5?0x8*_0xba719d*_0xba719d*_0xba719d*_0xba719d:0x1-0x8*_0x21f256*_0x21f256*_0x21f256*_0x21f256;case _0xa5480b(0x53b):return _0xba719d*_0xba719d*_0xba719d*_0xba719d*_0xba719d;case _0xa5480b(0x47c):var _0x21f256=_0xba719d-0x1;return 0x1+_0x21f256*_0x21f256*_0x21f256*_0x21f256*_0x21f256;case _0xa5480b(0x6c5):var _0x21f256=_0xba719d-0x1;return _0xba719d<0.5?0x10*_0xba719d*_0xba719d*_0xba719d*_0xba719d*_0xba719d:0x1+0x10*_0x21f256*_0x21f256*_0x21f256*_0x21f256*_0x21f256;case _0xa5480b(0x83e):if(_0xba719d===0x0){if(_0xa5480b(0x639)===_0xa5480b(0x533)){const _0x2763b2=this[_0xa5480b(0x791)]();_0x125120[_0xa5480b(0x7f1)](_0xa5480b(0x8a5))&&this[_0xa5480b(0x13d)](_0x4d3a16[_0xa5480b(0x222)](this[_0xa5480b(0x791)](),0x0)),_0x5cd3c7['isTriggered']('end')&&this[_0xa5480b(0x13d)](_0x2f93c7[_0xa5480b(0x347)](this[_0xa5480b(0x791)](),this[_0xa5480b(0x180)]()-0x1)),this[_0xa5480b(0x791)]()!==_0x2763b2&&this[_0xa5480b(0x5fb)]();}else return 0x0;}return Math[_0xa5480b(0x386)](0x2,0xa*(_0xba719d-0x1));case _0xa5480b(0x651):if(_0xba719d===0x1){if(_0xa5480b(0x6df)===_0xa5480b(0x1a2)){const _0x30ac53=_0x134db7['currentClass']()[_0xa5480b(0x41f)][_0xa5480b(0x552)](/\\I\[(\d+)\]/gi,'');this[_0xa5480b(0x84f)](_0x30ac53,_0x568074,_0x4f7df9,_0x577fe9);}else return 0x1;}return-Math[_0xa5480b(0x386)](0x2,-0xa*_0xba719d)+0x1;case _0xa5480b(0x441):if(_0xba719d===0x0||_0xba719d===0x1){if(_0xa5480b(0x3c7)==='rbcZO')return _0xba719d;else _0x53244d['setupNewGame'](),_0x76fe62[_0xa5480b(0x666)](_0x300b6c);}var _0x4c62c2=_0xba719d*0x2,_0x5a5a9b=_0x4c62c2-0x1;if(_0x4c62c2<0x1)return 0.5*Math[_0xa5480b(0x386)](0x2,0xa*_0x5a5a9b);return 0.5*(-Math['pow'](0x2,-0xa*_0x5a5a9b)+0x2);case _0xa5480b(0x34b):var _0x4c62c2=_0xba719d/0x1;return-0x1*(Math['sqrt'](0x1-_0x4c62c2*_0xba719d)-0x1);case _0xa5480b(0x81a):var _0x21f256=_0xba719d-0x1;return Math['sqrt'](0x1-_0x21f256*_0x21f256);case _0xa5480b(0x271):var _0x4c62c2=_0xba719d*0x2,_0x5a5a9b=_0x4c62c2-0x2;if(_0x4c62c2<0x1)return-0.5*(Math[_0xa5480b(0x76b)](0x1-_0x4c62c2*_0x4c62c2)-0x1);return 0.5*(Math[_0xa5480b(0x76b)](0x1-_0x5a5a9b*_0x5a5a9b)+0x1);case'INBACK':return _0xba719d*_0xba719d*((_0x2d4ba2+0x1)*_0xba719d-_0x2d4ba2);case'OUTBACK':var _0x4c62c2=_0xba719d/0x1-0x1;return _0x4c62c2*_0x4c62c2*((_0x2d4ba2+0x1)*_0x4c62c2+_0x2d4ba2)+0x1;break;case'INOUTBACK':var _0x4c62c2=_0xba719d*0x2,_0x12d827=_0x4c62c2-0x2,_0x125aee=_0x2d4ba2*1.525;if(_0x4c62c2<0x1){if(_0xa5480b(0x8c6)!==_0xa5480b(0x700))return 0.5*_0x4c62c2*_0x4c62c2*((_0x125aee+0x1)*_0x4c62c2-_0x125aee);else{_0x28d5a4['prototype'][_0xa5480b(0x4f0)][_0xa5480b(0x865)](this),this['updateShadow']();if(this['_actor'])this[_0xa5480b(0x8b4)]();else this[_0xa5480b(0x288)]!==''&&(this['_battlerName']='');}}return 0.5*(_0x12d827*_0x12d827*((_0x125aee+0x1)*_0x12d827+_0x125aee)+0x2);case _0xa5480b(0x3c4):if(_0xba719d===0x0||_0xba719d===0x1)return _0xba719d;var _0x4c62c2=_0xba719d/0x1,_0x5a5a9b=_0x4c62c2-0x1,_0x25c636=0x1-_0x4cb95a,_0x125aee=_0x25c636/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0xa5480b(0x386)](0x2,0xa*_0x5a5a9b)*Math['sin']((_0x5a5a9b-_0x125aee)*(0x2*Math['PI'])/_0x25c636));case'OUTELASTIC':var _0x25c636=0x1-_0x4cb95a,_0x4c62c2=_0xba719d*0x2;if(_0xba719d===0x0||_0xba719d===0x1)return _0xba719d;var _0x125aee=_0x25c636/(0x2*Math['PI'])*Math[_0xa5480b(0x160)](0x1);return Math['pow'](0x2,-0xa*_0x4c62c2)*Math['sin']((_0x4c62c2-_0x125aee)*(0x2*Math['PI'])/_0x25c636)+0x1;case'INOUTELASTIC':var _0x25c636=0x1-_0x4cb95a;if(_0xba719d===0x0||_0xba719d===0x1){if(_0xa5480b(0x2a3)===_0xa5480b(0x2a3))return _0xba719d;else _0x4ac4e8[_0xa5480b(0x7e2)][_0xa5480b(0x865)](this,_0x575b38);}var _0x4c62c2=_0xba719d*0x2,_0x5a5a9b=_0x4c62c2-0x1,_0x125aee=_0x25c636/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x4c62c2<0x1)return-0.5*(Math[_0xa5480b(0x386)](0x2,0xa*_0x5a5a9b)*Math[_0xa5480b(0x23d)]((_0x5a5a9b-_0x125aee)*(0x2*Math['PI'])/_0x25c636));return Math[_0xa5480b(0x386)](0x2,-0xa*_0x5a5a9b)*Math[_0xa5480b(0x23d)]((_0x5a5a9b-_0x125aee)*(0x2*Math['PI'])/_0x25c636)*0.5+0x1;case _0xa5480b(0x45e):var _0x4c62c2=_0xba719d/0x1;if(_0x4c62c2<0x1/2.75)return 7.5625*_0x4c62c2*_0x4c62c2;else{if(_0x4c62c2<0x2/2.75){var _0x12d827=_0x4c62c2-1.5/2.75;return 7.5625*_0x12d827*_0x12d827+0.75;}else{if(_0x4c62c2<2.5/2.75){if(_0xa5480b(0x2e0)===_0xa5480b(0x2e0)){var _0x12d827=_0x4c62c2-2.25/2.75;return 7.5625*_0x12d827*_0x12d827+0.9375;}else{if(this[_0xa5480b(0x3a4)]===_0x525839)this[_0xa5480b(0x466)]();if(this[_0xa5480b(0x3a4)][_0xa5480b(0x8c9)]===_0xfe5885)this[_0xa5480b(0x61b)]();this[_0xa5480b(0x3a4)][_0xa5480b(0x8c9)]=_0x1ba7a5;}}else{var _0x12d827=_0x4c62c2-2.625/2.75;return 7.5625*_0x12d827*_0x12d827+0.984375;}}}case _0xa5480b(0x670):var _0x22724f=0x1-VisuMZ[_0xa5480b(0x737)](0x1-_0xba719d,'outbounce');return _0x22724f;case _0xa5480b(0x259):if(_0xba719d<0.5)var _0x22724f=VisuMZ[_0xa5480b(0x737)](_0xba719d*0x2,_0xa5480b(0x7af))*0.5;else{if(_0xa5480b(0x642)!==_0xa5480b(0x642))this[_0xa5480b(0x62a)][_0xa5480b(0x57a)](_0x36b7fe[_0xa5480b(0x711)][_0xa5480b(0x895)]);else var _0x22724f=VisuMZ['ApplyEasing'](_0xba719d*0x2-0x1,_0xa5480b(0x60b))*0.5+0.5;}return _0x22724f;default:return _0xba719d;}},VisuMZ[_0x193f56(0x781)]=function(_0xf4223f){const _0x1e8b6f=_0x193f56;_0xf4223f=String(_0xf4223f)[_0x1e8b6f(0x125)]();const _0x23138b=VisuMZ[_0x1e8b6f(0x818)][_0x1e8b6f(0x7fe)]['Param'];if(_0xf4223f===_0x1e8b6f(0x5f0))return _0x23138b[_0x1e8b6f(0x25f)];if(_0xf4223f===_0x1e8b6f(0x4d5))return _0x23138b[_0x1e8b6f(0x51d)];if(_0xf4223f===_0x1e8b6f(0x1f3))return _0x23138b[_0x1e8b6f(0x10f)];if(_0xf4223f===_0x1e8b6f(0x100))return _0x23138b[_0x1e8b6f(0x5ea)];if(_0xf4223f==='MAT')return _0x23138b[_0x1e8b6f(0x888)];if(_0xf4223f===_0x1e8b6f(0x5fa))return _0x23138b['IconParam5'];if(_0xf4223f==='AGI')return _0x23138b[_0x1e8b6f(0x6ca)];if(_0xf4223f===_0x1e8b6f(0x7cd))return _0x23138b['IconParam7'];if(_0xf4223f===_0x1e8b6f(0x5f5))return _0x23138b['IconXParam0'];if(_0xf4223f==='EVA')return _0x23138b['IconXParam1'];if(_0xf4223f===_0x1e8b6f(0x11f))return _0x23138b[_0x1e8b6f(0x53e)];if(_0xf4223f===_0x1e8b6f(0x356))return _0x23138b[_0x1e8b6f(0x834)];if(_0xf4223f===_0x1e8b6f(0x55e))return _0x23138b[_0x1e8b6f(0x235)];if(_0xf4223f===_0x1e8b6f(0x4b8))return _0x23138b[_0x1e8b6f(0x7fc)];if(_0xf4223f===_0x1e8b6f(0x2dd))return _0x23138b[_0x1e8b6f(0x8a0)];if(_0xf4223f===_0x1e8b6f(0x2ec))return _0x23138b['IconXParam7'];if(_0xf4223f===_0x1e8b6f(0x17d))return _0x23138b[_0x1e8b6f(0x66a)];if(_0xf4223f===_0x1e8b6f(0x3da))return _0x23138b[_0x1e8b6f(0x84c)];if(_0xf4223f===_0x1e8b6f(0x4a4))return _0x23138b[_0x1e8b6f(0x1aa)];if(_0xf4223f===_0x1e8b6f(0x211))return _0x23138b[_0x1e8b6f(0x526)];if(_0xf4223f===_0x1e8b6f(0x679))return _0x23138b[_0x1e8b6f(0x186)];if(_0xf4223f===_0x1e8b6f(0x290))return _0x23138b[_0x1e8b6f(0x8a1)];if(_0xf4223f===_0x1e8b6f(0x2b2))return _0x23138b[_0x1e8b6f(0x331)];if(_0xf4223f==='TCR')return _0x23138b[_0x1e8b6f(0x3d3)];if(_0xf4223f===_0x1e8b6f(0x6b1))return _0x23138b[_0x1e8b6f(0x648)];if(_0xf4223f==='MDR')return _0x23138b[_0x1e8b6f(0x4b4)];if(_0xf4223f==='FDR')return _0x23138b['IconSParam8'];if(_0xf4223f===_0x1e8b6f(0x7d2))return _0x23138b['IconSParam9'];if(VisuMZ[_0x1e8b6f(0x818)][_0x1e8b6f(0x2a6)][_0xf4223f]){if(_0x1e8b6f(0x8f4)!==_0x1e8b6f(0x225))return VisuMZ[_0x1e8b6f(0x818)][_0x1e8b6f(0x2a6)][_0xf4223f]||0x0;else this[_0x1e8b6f(0x21f)]['scale']['y']=0x1/this[_0x1e8b6f(0x1d8)]['y'],this[_0x1e8b6f(0x21f)]['y']=-(this['y']/this[_0x1e8b6f(0x1d8)]['y']);}return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x2e44e3,_0x289778,_0x5dac98){const _0x10714a=_0x193f56;if(_0x5dac98===undefined&&_0x2e44e3%0x1===0x0)return _0x2e44e3;if(_0x5dac98!==undefined&&[_0x10714a(0x5f0),_0x10714a(0x4d5),'ATK','DEF',_0x10714a(0x1d3),_0x10714a(0x5fa),_0x10714a(0x43e),'LUK'][_0x10714a(0x267)](String(_0x5dac98)['toUpperCase']()[_0x10714a(0x4f6)]()))return _0x2e44e3;_0x289778=_0x289778||0x0;if(VisuMZ[_0x10714a(0x818)][_0x10714a(0x3e0)][_0x5dac98]){if(_0x10714a(0x659)!==_0x10714a(0x659))_0x29b83e[_0x10714a(0x818)][_0x10714a(0x8ac)][_0x10714a(0x865)](this),_0x3447ee=this;else{if(VisuMZ[_0x10714a(0x818)][_0x10714a(0x5c6)][_0x5dac98]===_0x10714a(0x60d))return _0x2e44e3;else{if('yWdki'!==_0x10714a(0x277))return String((_0x2e44e3*0x64)[_0x10714a(0x24c)](_0x289778))+'%';else _0x11dfcb[_0x10714a(0x818)]['Scene_Equip_create'][_0x10714a(0x865)](this),this[_0x10714a(0x738)]();}}}return String((_0x2e44e3*0x64)[_0x10714a(0x24c)](_0x289778))+'%';},VisuMZ['GroupDigits']=function(_0xd22d7b){const _0x4c474f=_0x193f56;_0xd22d7b=String(_0xd22d7b);if(!_0xd22d7b)return _0xd22d7b;if(typeof _0xd22d7b!==_0x4c474f(0x82e))return _0xd22d7b;const _0x1a5236=VisuMZ[_0x4c474f(0x818)]['Settings'][_0x4c474f(0x168)][_0x4c474f(0x53d)]||'en-US',_0x56d4af={'maximumFractionDigits':0x6};_0xd22d7b=_0xd22d7b[_0x4c474f(0x552)](/\[(.*?)\]/g,(_0x314908,_0x1e7df7)=>{const _0xd74d18=_0x4c474f;return VisuMZ[_0xd74d18(0x788)](_0x1e7df7,'[',']');}),_0xd22d7b=_0xd22d7b[_0x4c474f(0x552)](/<(.*?)>/g,(_0x18055d,_0x2ea5a0)=>{const _0x508c2d=_0x4c474f;return VisuMZ[_0x508c2d(0x788)](_0x2ea5a0,'<','>');}),_0xd22d7b=_0xd22d7b[_0x4c474f(0x552)](/\{\{(.*?)\}\}/g,(_0xb94456,_0x552a61)=>{const _0x23f32a=_0x4c474f;return VisuMZ[_0x23f32a(0x788)](_0x552a61,'','');}),_0xd22d7b=_0xd22d7b[_0x4c474f(0x552)](/(\d+\.?\d*)/g,(_0xa4cbb,_0x5c180a)=>{const _0xbaaf2=_0x4c474f;let _0x4375e2=_0x5c180a;if(_0x4375e2[0x0]==='0')return _0x4375e2;if(_0x4375e2[_0x4375e2['length']-0x1]==='.')return Number(_0x4375e2)[_0xbaaf2(0x68b)](_0x1a5236,_0x56d4af)+'.';else return _0x4375e2[_0x4375e2[_0xbaaf2(0x8f1)]-0x1]===','?Number(_0x4375e2)[_0xbaaf2(0x68b)](_0x1a5236,_0x56d4af)+',':_0xbaaf2(0x6c8)==='zqRfz'?_0x446046['layoutSettings']['ListRect']['call'](this):Number(_0x4375e2)['toLocaleString'](_0x1a5236,_0x56d4af);});let _0x127172=0x3;while(_0x127172--){if('gOcPM'===_0x4c474f(0x784)){if(_0x15b2de[_0x4c474f(0x6d7)]())return;_0x1291d4[_0x4c474f(0x7d0)](_0x38cb14,_0x2d154d);const _0x2746fa=_0x285557[_0x4c474f(0x5e5)][_0x4c474f(0x125)]()[_0x4c474f(0x4f6)](),_0x2ed7ae=_0x5be9d5[_0x4c474f(0x818)]['CreateBattleSystemID'](_0x2746fa);_0x5c10e2['setBattleSystem'](_0x2ed7ae);}else _0xd22d7b=VisuMZ['RevertPreserveNumbers'](_0xd22d7b);}return _0xd22d7b;},VisuMZ[_0x193f56(0x788)]=function(_0x15133a,_0x3ccced,_0x522747){const _0x1f094d=_0x193f56;return _0x15133a=_0x15133a[_0x1f094d(0x552)](/(\d)/gi,(_0x4955f7,_0x334663)=>_0x1f094d(0x523)['format'](Number(_0x334663))),_0x1f094d(0x823)[_0x1f094d(0x627)](_0x15133a,_0x3ccced,_0x522747);},VisuMZ[_0x193f56(0x17b)]=function(_0x3684c4){return _0x3684c4=_0x3684c4['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5c8857,_0x3895)=>Number(parseInt(_0x3895))),_0x3684c4;},VisuMZ[_0x193f56(0x8e3)]=function(_0x116dcf){const _0x489c5f=_0x193f56;SoundManager[_0x489c5f(0x199)]();if(!Utils[_0x489c5f(0x615)]()){if(_0x489c5f(0x5aa)===_0x489c5f(0x5aa)){const _0x46e7fa=window['open'](_0x116dcf,_0x489c5f(0x60e));}else{if(_0x2783fb[_0x489c5f(0x450)]())_0x15373a['log'](_0x2d8226);}}else{const _0x492c0e=process[_0x489c5f(0x8af)]==_0x489c5f(0x6d1)?'open':process[_0x489c5f(0x8af)]==_0x489c5f(0x24b)?'start':'xdg-open';require(_0x489c5f(0x32e))[_0x489c5f(0x52e)](_0x492c0e+'\x20'+_0x116dcf);}},Game_Picture[_0x193f56(0x415)][_0x193f56(0x6c7)]=function(){const _0x43acad=_0x193f56;return this[_0x43acad(0x398)];},VisuMZ['CoreEngine'][_0x193f56(0x618)]=Game_Picture['prototype'][_0x193f56(0x489)],Game_Picture[_0x193f56(0x415)][_0x193f56(0x489)]=function(){const _0x1aab44=_0x193f56;VisuMZ[_0x1aab44(0x818)]['Game_Picture_initBasic'][_0x1aab44(0x865)](this),this[_0x1aab44(0x398)]={'x':0x0,'y':0x0},this[_0x1aab44(0x4af)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x193f56(0x715)]=Game_Picture['prototype'][_0x193f56(0x685)],Game_Picture['prototype'][_0x193f56(0x685)]=function(){const _0x3e2890=_0x193f56;this['updateAnchor']();const _0xf54e0e=this[_0x3e2890(0x696)];VisuMZ[_0x3e2890(0x818)]['Game_Picture_updateMove'][_0x3e2890(0x865)](this),_0xf54e0e>0x0&&this[_0x3e2890(0x696)]<=0x0&&(this['_x']=this[_0x3e2890(0x682)],this['_y']=this[_0x3e2890(0x8a2)],this[_0x3e2890(0x602)]=this[_0x3e2890(0x148)],this[_0x3e2890(0x6b6)]=this[_0x3e2890(0x19f)],this[_0x3e2890(0x393)]=this[_0x3e2890(0x152)],this[_0x3e2890(0x398)]&&(this[_0x3e2890(0x398)]['x']=this[_0x3e2890(0x4af)]['x'],this[_0x3e2890(0x398)]['y']=this['_targetAnchor']['y']));},VisuMZ[_0x193f56(0x818)][_0x193f56(0x6e4)]=Game_Picture[_0x193f56(0x415)]['show'],Game_Picture['prototype'][_0x193f56(0x34d)]=function(_0x637309,_0x3a6c32,_0x1df670,_0x4235f3,_0x16bdfe,_0x189a0c,_0x2fa8bd,_0x423712){const _0x5287d5=_0x193f56;VisuMZ[_0x5287d5(0x818)][_0x5287d5(0x6e4)][_0x5287d5(0x865)](this,_0x637309,_0x3a6c32,_0x1df670,_0x4235f3,_0x16bdfe,_0x189a0c,_0x2fa8bd,_0x423712),this[_0x5287d5(0x120)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3a6c32]||{'x':0x0,'y':0x0});},VisuMZ[_0x193f56(0x818)][_0x193f56(0x1fb)]=Game_Picture[_0x193f56(0x415)]['move'],Game_Picture[_0x193f56(0x415)][_0x193f56(0x33b)]=function(_0x1445dc,_0x53966d,_0x56c4cc,_0x54c8db,_0x139386,_0x29119c,_0x204f16,_0x5eca51,_0xbb52e2){const _0x4b4209=_0x193f56;VisuMZ[_0x4b4209(0x818)][_0x4b4209(0x1fb)][_0x4b4209(0x865)](this,_0x1445dc,_0x53966d,_0x56c4cc,_0x54c8db,_0x139386,_0x29119c,_0x204f16,_0x5eca51,_0xbb52e2),this[_0x4b4209(0x4ee)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1445dc]||{'x':0x0,'y':0x0});},Game_Picture[_0x193f56(0x415)][_0x193f56(0x251)]=function(){const _0x54bef9=_0x193f56;if(this[_0x54bef9(0x696)]>0x0){if(_0x54bef9(0x61d)!==_0x54bef9(0x61d)){const _0x50cec2=_0x54bef9(0x58b);this['_colorCache']=this[_0x54bef9(0x406)]||{};if(this['_colorCache'][_0x50cec2])return this[_0x54bef9(0x406)][_0x50cec2];const _0xef7074=_0x121033[_0x54bef9(0x818)][_0x54bef9(0x7fe)][_0x54bef9(0x702)][_0x54bef9(0x86f)];return this['getColorDataFromPluginParameters'](_0x50cec2,_0xef7074);}else this['_anchor']['x']=this['applyEasing'](this[_0x54bef9(0x398)]['x'],this[_0x54bef9(0x4af)]['x']),this[_0x54bef9(0x398)]['y']=this[_0x54bef9(0x536)](this[_0x54bef9(0x398)]['y'],this['_targetAnchor']['y']);}},Game_Picture['prototype'][_0x193f56(0x120)]=function(_0x3e930b){const _0x2414b6=_0x193f56;this[_0x2414b6(0x398)]=_0x3e930b,this[_0x2414b6(0x4af)]=JsonEx[_0x2414b6(0x5e0)](this[_0x2414b6(0x398)]);},Game_Picture[_0x193f56(0x415)][_0x193f56(0x4ee)]=function(_0x505b34){this['_targetAnchor']=_0x505b34;},VisuMZ['CoreEngine'][_0x193f56(0x1c2)]=Sprite_Picture[_0x193f56(0x415)][_0x193f56(0x6dd)],Sprite_Picture[_0x193f56(0x415)][_0x193f56(0x6dd)]=function(){const _0x1f0f50=_0x193f56,_0x3885b8=this[_0x1f0f50(0x6f5)]();if(!_0x3885b8['anchor']()){if(_0x1f0f50(0x1b7)===_0x1f0f50(0x1b7))VisuMZ[_0x1f0f50(0x818)][_0x1f0f50(0x1c2)][_0x1f0f50(0x865)](this);else for(const _0x2f7b98 of _0xd49012[_0x1f0f50(0x37d)]){_0x2f7b98[_0x1f0f50(0x365)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2f7b98['level']=_0x29b1e1[_0x1f0f50(0x347)](_0x39751f(_0xc78672['$1']),0x1));}}else{if(_0x1f0f50(0x1b6)!==_0x1f0f50(0x1b6)){_0x2ce809[_0x1f0f50(0x7d0)](_0x2174d8,_0x3b50ae);const _0x3b5e7e=_0x1e6606[_0x1f0f50(0x63d)]||0x1,_0xf42e51=_0x3d8810[_0x1f0f50(0x6c3)]||_0x1f0f50(0x6b7),_0xb3a8=_0x53b6dd[_0x1f0f50(0x6f5)](_0x3b5e7e);_0xb3a8&&_0xb3a8[_0x1f0f50(0x868)](_0xf42e51);}else this[_0x1f0f50(0x6c7)]['x']=_0x3885b8['anchor']()['x'],this[_0x1f0f50(0x6c7)]['y']=_0x3885b8[_0x1f0f50(0x6c7)]()['y'];}},Game_Action[_0x193f56(0x415)][_0x193f56(0x589)]=function(_0x2afe37){const _0x5a18e5=_0x193f56;if(_0x2afe37){const _0x3d8f73=_0x2afe37[_0x5a18e5(0x8aa)];if(_0x3d8f73===0x1&&this[_0x5a18e5(0x4ec)]()['attackSkillId']()!==0x1)'CbEDN'===_0x5a18e5(0x3b1)?_0x3be45c[_0x5a18e5(0x818)][_0x5a18e5(0x326)][_0x5a18e5(0x865)](this,_0x270d42):this[_0x5a18e5(0x7ad)]();else _0x3d8f73===0x2&&this['subject']()[_0x5a18e5(0x1bd)]()!==0x2?this[_0x5a18e5(0x78f)]():this[_0x5a18e5(0x24a)](_0x3d8f73);}else this[_0x5a18e5(0x418)]();},Game_Actor[_0x193f56(0x415)][_0x193f56(0x7b7)]=function(){const _0x159290=_0x193f56;return this[_0x159290(0x797)]()['filter'](_0x450b66=>this[_0x159290(0x198)](_0x450b66)&&this[_0x159290(0x246)]()[_0x159290(0x267)](_0x450b66[_0x159290(0x7df)]));},Window_Base[_0x193f56(0x415)][_0x193f56(0x556)]=function(){const _0x324461=_0x193f56;this[_0x324461(0x4dd)]=new Sprite(),this['_dimmerSprite'][_0x324461(0x481)]=new Bitmap(0x0,0x0),this[_0x324461(0x4dd)]['x']=0x0,this[_0x324461(0x18a)](this[_0x324461(0x4dd)]);},Window_Base['prototype'][_0x193f56(0x36b)]=function(){const _0x1ea87c=_0x193f56;if(this[_0x1ea87c(0x4dd)]){const _0x54fe5e=this[_0x1ea87c(0x4dd)][_0x1ea87c(0x481)],_0xb94ba1=this[_0x1ea87c(0x890)],_0x4d9b07=this[_0x1ea87c(0x89f)],_0x21cb9b=this['padding'],_0x4360fc=ColorManager[_0x1ea87c(0x1c9)](),_0xaac747=ColorManager[_0x1ea87c(0x462)]();_0x54fe5e[_0x1ea87c(0x112)](_0xb94ba1,_0x4d9b07),_0x54fe5e[_0x1ea87c(0x401)](0x0,0x0,_0xb94ba1,_0x21cb9b,_0xaac747,_0x4360fc,!![]),_0x54fe5e['fillRect'](0x0,_0x21cb9b,_0xb94ba1,_0x4d9b07-_0x21cb9b*0x2,_0x4360fc),_0x54fe5e['gradientFillRect'](0x0,_0x4d9b07-_0x21cb9b,_0xb94ba1,_0x21cb9b,_0x4360fc,_0xaac747,!![]),this['_dimmerSprite'][_0x1ea87c(0x581)](0x0,0x0,_0xb94ba1,_0x4d9b07);}},Game_Actor['prototype']['makeAutoBattleActions']=function(){const _0x57da72=_0x193f56;for(let _0x41a7b8=0x0;_0x41a7b8<this[_0x57da72(0x279)]();_0x41a7b8++){const _0x1cefd8=this[_0x57da72(0x6c9)]();let _0x3877af=Number['MIN_SAFE_INTEGER'];this[_0x57da72(0x6bf)](_0x41a7b8,_0x1cefd8[0x0]);for(const _0x40ed40 of _0x1cefd8){const _0x5a09f0=_0x40ed40[_0x57da72(0x46f)]();if(_0x5a09f0>_0x3877af){if(_0x57da72(0x4d8)!==_0x57da72(0x86c))_0x3877af=_0x5a09f0,this[_0x57da72(0x6bf)](_0x41a7b8,_0x40ed40);else return _0x2dec9e['layoutSettings'][_0x57da72(0x2d6)][_0x57da72(0x865)](this);}}}this['setActionState'](_0x57da72(0x585));},Window_BattleItem[_0x193f56(0x415)][_0x193f56(0x12d)]=function(_0x4ad8e4){const _0xbfef80=_0x193f56;return BattleManager['actor']()?BattleManager[_0xbfef80(0x4ce)]()[_0xbfef80(0x198)](_0x4ad8e4):_0xbfef80(0x887)!==_0xbfef80(0x76e)?Window_ItemList['prototype'][_0xbfef80(0x12d)][_0xbfef80(0x865)](this,_0x4ad8e4):_0x14a089[_0xbfef80(0x2b6)](_0xbfef80(0x141));},VisuMZ['CoreEngine'][_0x193f56(0x8b7)]=Scene_Map[_0x193f56(0x415)][_0x193f56(0x4b6)],Scene_Map['prototype'][_0x193f56(0x4b6)]=function(){const _0x3cebb0=_0x193f56;VisuMZ['CoreEngine']['Scene_Map_createSpritesetFix']['call'](this);const _0x561260=this[_0x3cebb0(0x3f1)]['_timerSprite'];if(_0x561260)this[_0x3cebb0(0x6a3)](_0x561260);},VisuMZ[_0x193f56(0x818)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x193f56(0x415)]['createSpriteset'],Scene_Battle[_0x193f56(0x415)][_0x193f56(0x4b6)]=function(){const _0x4a25cf=_0x193f56;VisuMZ[_0x4a25cf(0x818)][_0x4a25cf(0x6ff)][_0x4a25cf(0x865)](this);const _0x31713c=this[_0x4a25cf(0x3f1)][_0x4a25cf(0x5b0)];if(_0x31713c)this[_0x4a25cf(0x6a3)](_0x31713c);},Sprite_Actor[_0x193f56(0x415)][_0x193f56(0x4f0)]=function(){const _0x5b4d6d=_0x193f56;Sprite_Battler['prototype'][_0x5b4d6d(0x4f0)][_0x5b4d6d(0x865)](this),this[_0x5b4d6d(0x734)]();if(this[_0x5b4d6d(0x80e)])this[_0x5b4d6d(0x8b4)]();else{if(this[_0x5b4d6d(0x288)]!==''){if(_0x5b4d6d(0x663)!==_0x5b4d6d(0x124))this[_0x5b4d6d(0x288)]='';else return _0x360f13[_0x5b4d6d(0x711)]['StatusRect'][_0x5b4d6d(0x865)](this);}}},Window[_0x193f56(0x415)][_0x193f56(0x4ba)]=function(){const _0x5829ec=_0x193f56,_0x441025=this['_width'],_0x3730ad=this['_height'],_0x3787bb=0x18,_0x43409b=_0x3787bb/0x2,_0x4fc7db=0x60+_0x3787bb,_0x306cbb=0x0+_0x3787bb;this[_0x5829ec(0x5b7)][_0x5829ec(0x481)]=this[_0x5829ec(0x2cf)],this[_0x5829ec(0x5b7)][_0x5829ec(0x6c7)]['x']=0.5,this['_downArrowSprite'][_0x5829ec(0x6c7)]['y']=0.5,this[_0x5829ec(0x5b7)]['setFrame'](_0x4fc7db+_0x43409b,_0x306cbb+_0x43409b+_0x3787bb,_0x3787bb,_0x43409b),this[_0x5829ec(0x5b7)][_0x5829ec(0x33b)](Math['round'](_0x441025/0x2),Math['round'](_0x3730ad-_0x43409b)),this[_0x5829ec(0x12a)]['bitmap']=this[_0x5829ec(0x2cf)],this[_0x5829ec(0x12a)][_0x5829ec(0x6c7)]['x']=0.5,this[_0x5829ec(0x12a)][_0x5829ec(0x6c7)]['y']=0.5,this[_0x5829ec(0x12a)][_0x5829ec(0x581)](_0x4fc7db+_0x43409b,_0x306cbb,_0x3787bb,_0x43409b),this[_0x5829ec(0x12a)][_0x5829ec(0x33b)](Math['round'](_0x441025/0x2),Math[_0x5829ec(0x44b)](_0x43409b));},Window[_0x193f56(0x415)][_0x193f56(0x64e)]=function(){const _0x5177d8=_0x193f56,_0x2d617f=0x90,_0x1e533f=0x60,_0x43b94e=0x18;this[_0x5177d8(0x34f)][_0x5177d8(0x481)]=this[_0x5177d8(0x2cf)],this['_pauseSignSprite'][_0x5177d8(0x6c7)]['x']=0.5,this[_0x5177d8(0x34f)][_0x5177d8(0x6c7)]['y']=0x1,this[_0x5177d8(0x34f)][_0x5177d8(0x33b)](Math['round'](this[_0x5177d8(0x2c5)]/0x2),this['_height']),this[_0x5177d8(0x34f)][_0x5177d8(0x581)](_0x2d617f,_0x1e533f,_0x43b94e,_0x43b94e),this['_pauseSignSprite'][_0x5177d8(0x39f)]=0xff;},Window[_0x193f56(0x415)]['_updateFilterArea']=function(){const _0x3c0f49=_0x193f56,_0x39e235=this[_0x3c0f49(0x43f)]['worldTransform']['apply'](new Point(0x0,0x0)),_0x439633=this[_0x3c0f49(0x43f)][_0x3c0f49(0x7ac)];_0x439633['x']=_0x39e235['x']+this[_0x3c0f49(0x61a)]['x'],_0x439633['y']=_0x39e235['y']+this[_0x3c0f49(0x61a)]['y'],_0x439633[_0x3c0f49(0x890)]=Math['ceil'](this['innerWidth']*this['scale']['x']),_0x439633[_0x3c0f49(0x89f)]=Math[_0x3c0f49(0x840)](this[_0x3c0f49(0x3aa)]*this[_0x3c0f49(0x1d8)]['y']);},Window['prototype'][_0x193f56(0x6e7)]=function(){const _0x319799=_0x193f56,_0x710965=this['_margin'],_0x22c52b=Math[_0x319799(0x347)](0x0,this[_0x319799(0x2c5)]-_0x710965*0x2),_0xa95244=Math[_0x319799(0x347)](0x0,this['_height']-_0x710965*0x2),_0xef4980=this[_0x319799(0x5d3)],_0x366dbf=_0xef4980[_0x319799(0x18f)][0x0];_0xef4980['bitmap']=this[_0x319799(0x2cf)],_0xef4980[_0x319799(0x581)](0x0,0x0,0x60,0x60),_0xef4980[_0x319799(0x33b)](_0x710965,_0x710965),_0xef4980[_0x319799(0x1d8)]['x']=_0x22c52b/0x60,_0xef4980[_0x319799(0x1d8)]['y']=_0xa95244/0x60,_0x366dbf['bitmap']=this[_0x319799(0x2cf)],_0x366dbf[_0x319799(0x581)](0x0,0x60,0x60,0x60),_0x366dbf['move'](0x0,0x0,_0x22c52b,_0xa95244),_0x366dbf[_0x319799(0x1d8)]['x']=0x1/_0xef4980[_0x319799(0x1d8)]['x'],_0x366dbf['scale']['y']=0x1/_0xef4980[_0x319799(0x1d8)]['y'],_0xef4980[_0x319799(0x83d)](this[_0x319799(0x5cc)]);},Game_Temp[_0x193f56(0x415)][_0x193f56(0x6ee)]=function(){const _0x552ec9=_0x193f56;this[_0x552ec9(0x42a)]=[],this[_0x552ec9(0x5a2)]=[],this['_pointAnimationQueue']=[],this['_balloonQueue']=[];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x60c)]=Scene_Base['prototype'][_0x193f56(0x366)],Scene_Base[_0x193f56(0x415)][_0x193f56(0x366)]=function(){const _0x130524=_0x193f56;if($gameTemp)$gameTemp[_0x130524(0x6ee)]();VisuMZ[_0x130524(0x818)][_0x130524(0x60c)]['call'](this);},Bitmap[_0x193f56(0x415)][_0x193f56(0x719)]=function(_0x56c9a0){const _0x1f0b95=_0x193f56,_0x54ff3c=this[_0x1f0b95(0x3b7)];_0x54ff3c['save'](),_0x54ff3c[_0x1f0b95(0x6f2)]=this[_0x1f0b95(0x44f)]();const _0x51b34f=_0x54ff3c[_0x1f0b95(0x80c)](_0x56c9a0)['width'];return _0x54ff3c[_0x1f0b95(0x130)](),_0x51b34f;},Window_Message[_0x193f56(0x415)][_0x193f56(0x2c3)]=function(_0x56ab46){const _0x3e4b4a=_0x193f56;return this[_0x3e4b4a(0x108)]()?this['contents'][_0x3e4b4a(0x719)](_0x56ab46):Window_Base[_0x3e4b4a(0x415)][_0x3e4b4a(0x2c3)][_0x3e4b4a(0x865)](this,_0x56ab46);},Window_Message['prototype'][_0x193f56(0x108)]=function(){const _0x1b6856=_0x193f56;return VisuMZ[_0x1b6856(0x818)][_0x1b6856(0x7fe)][_0x1b6856(0x168)][_0x1b6856(0x29d)]??!![];},VisuMZ[_0x193f56(0x818)][_0x193f56(0x53f)]=Game_Action[_0x193f56(0x415)]['numRepeats'],Game_Action[_0x193f56(0x415)][_0x193f56(0x695)]=function(){const _0xb5e840=_0x193f56;return this[_0xb5e840(0x7e1)]()?VisuMZ[_0xb5e840(0x818)][_0xb5e840(0x53f)][_0xb5e840(0x865)](this):_0xb5e840(0x578)===_0xb5e840(0x578)?0x0:_0x2af043[_0xb5e840(0x711)][_0xb5e840(0x824)]['call'](this);},VisuMZ[_0x193f56(0x818)]['Game_Action_setAttack']=Game_Action[_0x193f56(0x415)]['setAttack'],Game_Action[_0x193f56(0x415)][_0x193f56(0x7ad)]=function(){const _0x101875=_0x193f56;if(this['subject']()&&this[_0x101875(0x4ec)]()[_0x101875(0x55b)]()){if(_0x101875(0x75a)===_0x101875(0x75a))VisuMZ[_0x101875(0x818)][_0x101875(0x625)][_0x101875(0x865)](this);else{const _0x43c5cc=_0x4d905d[_0x101875(0x474)],_0x1c1660=_0x5050e1[_0x101875(0x415)][_0x101875(0x7a2)](),_0x5a5e54=0x0;let _0x515da8=0x0;return this[_0x101875(0x4d9)]()===_0x101875(0x72d)?_0x515da8=0x0:_0x515da8=_0x534695[_0x101875(0x485)]-_0x1c1660,new _0x2b6a76(_0x5a5e54,_0x515da8,_0x43c5cc,_0x1c1660);}}else _0x101875(0x71d)===_0x101875(0x71d)?this[_0x101875(0x418)]():_0x537afa['loadBitmap'](_0xee3153,_0x232ddb);},Sprite_Name[_0x193f56(0x415)]['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x193f56(0x415)][_0x193f56(0x426)]=function(){const _0x2510b7=_0x193f56,_0x2d9d05=this[_0x2510b7(0x41f)](),_0x489c78=this[_0x2510b7(0x7dc)](),_0x1be5b3=this[_0x2510b7(0x80d)]();this[_0x2510b7(0x26b)](),this[_0x2510b7(0x481)][_0x2510b7(0x418)](),this['bitmap'][_0x2510b7(0x841)](_0x2d9d05,0x0,0x0,_0x489c78,_0x1be5b3,_0x2510b7(0x77f));},Bitmap['prototype'][_0x193f56(0x841)]=function(_0x441a8c,_0x2ba4b2,_0xc74dd7,_0x4ae910,_0x39dd72,_0x5eea2d){const _0x5016f6=_0x193f56,_0x2850e3=this[_0x5016f6(0x3b7)],_0x5cd8a3=_0x2850e3['globalAlpha'];_0x4ae910=_0x4ae910||0xffffffff;let _0x24bc32=_0x2ba4b2,_0x11a015=Math['round'](_0xc74dd7+0x18/0x2+this[_0x5016f6(0x5dd)]*0.35);if(_0x5eea2d===_0x5016f6(0x6aa)){if(_0x5016f6(0x374)===_0x5016f6(0x812)){var _0x3ebe65=_0x11b212(_0x9dbfab['$1']);_0x12f365+=_0x3ebe65;}else _0x24bc32+=_0x4ae910/0x2;}_0x5eea2d===_0x5016f6(0x5cf)&&(_0x24bc32+=_0x4ae910),_0x2850e3[_0x5016f6(0x1a3)](),_0x2850e3[_0x5016f6(0x6f2)]=this[_0x5016f6(0x44f)](),_0x2850e3[_0x5016f6(0x598)]=_0x5eea2d,_0x2850e3[_0x5016f6(0x753)]=_0x5016f6(0x45d),_0x2850e3[_0x5016f6(0x3a8)]=0x1,this[_0x5016f6(0x892)](_0x441a8c,_0x24bc32,_0x11a015,_0x4ae910),_0x2850e3[_0x5016f6(0x3a8)]=_0x5cd8a3,this[_0x5016f6(0x71c)](_0x441a8c,_0x24bc32,_0x11a015,_0x4ae910),_0x2850e3[_0x5016f6(0x130)](),this['_baseTexture'][_0x5016f6(0x4f0)]();},VisuMZ[_0x193f56(0x818)][_0x193f56(0x7b2)]=BattleManager[_0x193f56(0x54e)],BattleManager[_0x193f56(0x54e)]=function(_0x39f90a){const _0x119184=_0x193f56;if(this['_action'][_0x119184(0x67e)]())return![];return VisuMZ['CoreEngine']['BattleManager_checkSubstitute'][_0x119184(0x865)](this,_0x39f90a);};